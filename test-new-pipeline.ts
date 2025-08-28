import 'dotenv/config';
import * as fs from 'fs';
import { generateStep1Prompt } from './src/prompts/step1-problem-analysis';
import { generateStep2Prompt } from './src/prompts/step2-tool-research';
import { generateStep3Prompt } from './src/prompts/step3-tool-curation';
import { generateStep4Prompt } from './src/prompts/step4-report-generation';

// Load enhanced responses
const responses = JSON.parse(fs.readFileSync('./enhanced-responses.json', 'utf-8'));
const companyName = 'Adisco Locs Stylist Ltd';

console.log('=================================');
console.log('TESTING NEW PIPELINE FOR:', companyName);
console.log('=================================\n');

console.log('Customer Context:');
console.log('- Hair & beauty salon specializing in dreadlocks');
console.log('- Already has Fresha and electronic payments');
console.log('- Problem: Customers used to paying after service (no deposits)');
console.log('- Challenge: No-shows and late cancellations costing £2,200/month');
console.log('- Need: Deposit system that works without driving customers away\n');

async function runPipeline() {
  try {
    // Step 1: Problem Analysis
    console.log('STEP 1: PROBLEM ANALYSIS');
    console.log('========================');
    const step1Prompt = generateStep1Prompt(responses, companyName);
    console.log('Analyzing business problems with new context fields...');
    console.log('- Systems reality: Fresha + WhatsApp + Excel chaos');
    console.log('- Ideal vision: Seamless booking with deposits that work\n');
    
    // Create directories
    if (!fs.existsSync('./test-prompts')) fs.mkdirSync('./test-prompts');
    if (!fs.existsSync('./test-outputs')) fs.mkdirSync('./test-outputs');
    
    // Save prompt for inspection
    fs.writeFileSync('./test-prompts/step1-prompt.txt', step1Prompt);
    
    // Call OpenAI API
    console.log('Calling OpenAI API...');
    const response1 = await callOpenAI(step1Prompt);
    const problemAnalysis = JSON.parse(response1);
    console.log('✓ Problem Analysis Complete');
    console.log('Top problems identified:', problemAnalysis.topOpportunities.map((o: any) => o.problemArea));
    fs.writeFileSync('./test-outputs/step1-analysis.json', JSON.stringify(problemAnalysis, null, 2));
    
    // Step 2: Tool Research  
    console.log('\nSTEP 2: AI TOOL RESEARCH');
    console.log('========================');
    const step2Prompt = generateStep2Prompt(problemAnalysis);
    console.log('Searching for AI-powered scheduling and deposit solutions...');
    console.log('Focus: Beauty salon industry, micro business size');
    console.log('Must work with: Fresha, payment systems');
    console.log('Key search areas:');
    console.log('- AI scheduling for beauty salons');
    console.log('- Smart deposit systems that convert');
    console.log('- No-show prevention tools\n');
    fs.writeFileSync('./test-prompts/step2-prompt.txt', step2Prompt);
    
    const response2 = await callOpenAI(step2Prompt);
    const toolResearch = JSON.parse(response2);
    console.log('✓ Tool Research Complete');
    console.log('Solutions found:', toolResearch.recommendedSolutions.length);
    fs.writeFileSync('./test-outputs/step2-research.json', JSON.stringify(toolResearch, null, 2));
    
    // Step 3: Tool Curation
    console.log('\nSTEP 3: SOLUTION CURATION');
    console.log('=========================');
    const step3Prompt = generateStep3Prompt(problemAnalysis, toolResearch);
    console.log('Curating best solutions for Adisco Locs...');
    fs.writeFileSync('./test-prompts/step3-prompt.txt', step3Prompt);
    
    const response3 = await callOpenAI(step3Prompt);
    const curatedTools = JSON.parse(response3);
    console.log('✓ Solution Curation Complete');
    console.log('Total investment:', curatedTools.clientSolution.executiveSummary.totalInvestmentRange);
    console.log('Expected ROI:', curatedTools.clientSolution.executiveSummary.expectedROI);
    fs.writeFileSync('./test-outputs/step3-curated.json', JSON.stringify(curatedTools, null, 2));
    
    // Step 4: Report Generation
    console.log('\nSTEP 4: FINAL REPORT');
    console.log('====================');
    const step4Prompt = generateStep4Prompt(problemAnalysis, curatedTools.clientSolution);
    console.log('Generating executive report...');
    fs.writeFileSync('./test-prompts/step4-prompt.txt', step4Prompt);
    
    const response4 = await callOpenAI(step4Prompt);
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
    finalReport.recommendedSolutions.forEach((sol: any, i: number) => {
      console.log(`${i + 1}. ${sol.solutionName}`);
      console.log(`   Impact: ${sol.directImpact[0]}`);
    });
    console.log('\nAll outputs saved to test-outputs/');
    
  } catch (error: any) {
    console.error('Error in pipeline:', error);
    console.error('Details:', error.message);
  }
}

async function callOpenAI(prompt: string): Promise<string> {
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
    })
  });
  
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  
  // Clean the response - remove any markdown formatting if present
  let content = data.choices[0].message.content;
  content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  return content;
}

// Run the pipeline
runPipeline();