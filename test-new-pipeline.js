require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const { generateStep1Prompt } = require('./src/prompts/step1-problem-analysis.ts');
const { generateStep2Prompt } = require('./src/prompts/step2-tool-research.ts');
const { generateStep3Prompt } = require('./src/prompts/step3-tool-curation.ts');
const { generateStep4Prompt } = require('./src/prompts/step4-report-generation.ts');

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
    console.log('Prompt preview (first 1000 chars):');
    console.log(step1Prompt.substring(0, 1000) + '...\n');
    
    // Save prompt for manual testing
    fs.writeFileSync('./test-prompts/step1-prompt.txt', step1Prompt);
    
    // Call OpenAI API
    const response1 = await callOpenAI(step1Prompt);
    const problemAnalysis = JSON.parse(response1);
    console.log('Problem Analysis Result:');
    console.log(JSON.stringify(problemAnalysis, null, 2));
    fs.writeFileSync('./test-outputs/step1-analysis.json', JSON.stringify(problemAnalysis, null, 2));
    
    // Step 2: Tool Research
    console.log('\nSTEP 2: TOOL RESEARCH');
    console.log('=====================');
    const step2Prompt = generateStep2Prompt(problemAnalysis);
    console.log('Searching for AI-powered solutions for scheduling and deposits...');
    fs.writeFileSync('./test-prompts/step2-prompt.txt', step2Prompt);
    
    const response2 = await callOpenAI(step2Prompt);
    const toolResearch = JSON.parse(response2);
    console.log('Tool Research Result:');
    console.log(JSON.stringify(toolResearch, null, 2));
    fs.writeFileSync('./test-outputs/step2-research.json', JSON.stringify(toolResearch, null, 2));
    
    // Step 3: Tool Curation
    console.log('\nSTEP 3: TOOL CURATION');
    console.log('=====================');
    const step3Prompt = generateStep3Prompt(problemAnalysis, toolResearch);
    fs.writeFileSync('./test-prompts/step3-prompt.txt', step3Prompt);
    
    const response3 = await callOpenAI(step3Prompt);
    const curatedTools = JSON.parse(response3);
    console.log('Curated Tools Result:');
    console.log(JSON.stringify(curatedTools.clientSolution.executiveSummary, null, 2));
    fs.writeFileSync('./test-outputs/step3-curated.json', JSON.stringify(curatedTools, null, 2));
    
    // Step 4: Report Generation
    console.log('\nSTEP 4: REPORT GENERATION');
    console.log('=========================');
    const step4Prompt = generateStep4Prompt(problemAnalysis, curatedTools.clientSolution);
    fs.writeFileSync('./test-prompts/step4-prompt.txt', step4Prompt);
    
    const response4 = await callOpenAI(step4Prompt);
    const finalReport = JSON.parse(response4);
    console.log('Final Report Generated:');
    console.log(JSON.stringify(finalReport.executiveSummary, null, 2));
    fs.writeFileSync('./test-outputs/step4-report.json', JSON.stringify(finalReport, null, 2));
    
    console.log('\n=================================');
    console.log('PIPELINE COMPLETE!');
    console.log('=================================');
    console.log('Check test-outputs/ folder for full results');
    
  } catch (error) {
    console.error('Error in pipeline:', error);
  }
}

async function callOpenAI(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an AI business consultant. Always return valid JSON only.' },
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
  return data.choices[0].message.content;
}

// Create directories
if (!fs.existsSync('./test-prompts')) fs.mkdirSync('./test-prompts');
if (!fs.existsSync('./test-outputs')) fs.mkdirSync('./test-outputs');

runPipeline();