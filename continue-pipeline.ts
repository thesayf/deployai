import 'dotenv/config';
import * as fs from 'fs';
import { generateStep3Prompt } from './src/prompts/step3-tool-curation';
import { generateStep4Prompt } from './src/prompts/step4-report-generation';

console.log('=================================');
console.log('CONTINUING PIPELINE - STEPS 3 & 4');
console.log('=================================\n');

// Load existing outputs
const problemAnalysis = JSON.parse(fs.readFileSync('./test-outputs/step1-analysis.json', 'utf-8'));
const toolResearch = JSON.parse(fs.readFileSync('./test-outputs/step2-research.json', 'utf-8'));

async function continuePipeline() {
  try {
    // Step 3: Tool Curation
    console.log('STEP 3: SOLUTION CURATION');
    console.log('=========================');
    console.log('Curating best solutions for Adisco Locs Stylist Ltd...');
    
    const step3Prompt = generateStep3Prompt(problemAnalysis, toolResearch);
    fs.writeFileSync('./test-prompts/step3-prompt.txt', step3Prompt);
    console.log('Prompt saved. Calling OpenAI API with extended timeout...');
    
    const response3 = await callOpenAI(step3Prompt, 60000); // 60 second timeout
    const curatedTools = JSON.parse(response3);
    
    console.log('✓ Solution Curation Complete');
    if (curatedTools.clientSolution?.executiveSummary) {
      console.log('Total investment:', curatedTools.clientSolution.executiveSummary.totalInvestmentRange);
      console.log('Expected ROI:', curatedTools.clientSolution.executiveSummary.expectedROI);
    }
    fs.writeFileSync('./test-outputs/step3-curated.json', JSON.stringify(curatedTools, null, 2));
    
    // Step 4: Report Generation
    console.log('\nSTEP 4: FINAL REPORT');
    console.log('====================');
    console.log('Generating executive report...');
    
    const step4Prompt = generateStep4Prompt(problemAnalysis, curatedTools.clientSolution);
    fs.writeFileSync('./test-prompts/step4-prompt.txt', step4Prompt);
    
    const response4 = await callOpenAI(step4Prompt, 60000); // 60 second timeout
    const finalReport = JSON.parse(response4);
    
    console.log('✓ Report Generation Complete');
    console.log('\nExecutive Summary:');
    console.log('- Readiness:', finalReport.executiveSummary.readinessLevel);
    console.log('- Annual Opportunity:', finalReport.executiveSummary.estimatedAnnualOpportunity);
    console.log('- ROI:', finalReport.executiveSummary.immediateROI);
    fs.writeFileSync('./test-outputs/step4-report.json', JSON.stringify(finalReport, null, 2));
    
    console.log('\n=================================');
    console.log('✓ PIPELINE COMPLETE!');
    console.log('=================================');
    console.log('\nKey Recommendations:');
    if (finalReport.recommendedSolutions) {
      finalReport.recommendedSolutions.forEach((sol: any, i: number) => {
        console.log(`${i + 1}. ${sol.solutionName}`);
        if (sol.directImpact && sol.directImpact[0]) {
          console.log(`   Impact: ${sol.directImpact[0]}`);
        }
      });
    }
    console.log('\nAll outputs saved to test-outputs/');
    
  } catch (error: any) {
    console.error('Error in pipeline:', error);
    console.error('Details:', error.message);
    if (error.response) {
      console.error('API Response:', error.response);
    }
  }
}

async function callOpenAI(prompt: string, timeout: number = 30000): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    console.log(`Making API call with ${timeout/1000}s timeout...`);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'You are an AI business consultant specializing in finding AI-powered solutions for small businesses. Always return valid JSON only, no markdown formatting, no explanations outside JSON.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    // Clean the response - remove any markdown formatting if present
    let content = data.choices[0].message.content;
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    console.log('API call successful');
    return content;
    
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`API call timed out after ${timeout/1000} seconds`);
    }
    throw error;
  }
}

// Run the continuation
continuePipeline();