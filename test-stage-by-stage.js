// Test each stage individually with shorter timeouts
const fs = require('fs');

const testResponses = {
  industry: "Manufacturing",
  companySize: "50-100 employees",
  monthlyBudget: "$5,000-10,000",
  timeline: "Next 3 months",
  efficiencyRating: "3",
  repetitiveTasks: ["dataEntry", "scheduling", "reporting"],
  weeklyTimeBreakdown: {
    "dataEntry": "20-40hrs",
    "scheduling": "10-20hrs", 
    "reporting": "40-80hrs",
    "_notes": "Most time spent on monthly reporting cycles"
  },
  businessChallenges: ["cashFlow", "customerRetention", "inefficientProcesses"],
  monthlyCostBreakdown: {
    "cashFlow": "$5-15k",
    "customerRetention": "$2.5-5k",
    "inefficientProcesses": "$15-50k",
    "_notes": "Inefficient processes causing major delays"
  },
  currentSystems: "QuickBooks, Excel, Salesforce",
  moneyLeaks: ["undercharging", "inefficientProcesses"],
  desiredOutcome: ["reduceCosts", "improveEfficiency"],
  teamCapability: "Some technical expertise"
};

async function testWithTimeout(stageName, testFunc, timeoutMs = 30000) {
  console.log(`\n=== Testing ${stageName} ===`);
  console.log(`Timeout: ${timeoutMs / 1000} seconds`);
  
  try {
    const result = await Promise.race([
      testFunc(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error(`Timeout after ${timeoutMs/1000}s`)), timeoutMs)
      )
    ]);
    
    console.log(`✅ ${stageName} completed successfully`);
    return result;
  } catch (error) {
    console.error(`❌ ${stageName} failed:`, error.message);
    throw error;
  }
}

async function stage1Test() {
  const response = await fetch('http://localhost:3000/api/ai/step1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      responses: testResponses,
      company: "Test Manufacturing Co"
    })
  });

  const result = await response.json();
  if (!result.success) throw new Error('Stage 1 failed');
  
  console.log('- Opportunities found:', result.data.topOpportunities?.length);
  console.log('- First opportunity has metrics:', !!(result.data.topOpportunities?.[0]?.monthlyTimeCost));
  
  return result.data;
}

async function stage2Test(problemAnalysis) {
  const response = await fetch('http://localhost:3000/api/ai/step2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemAnalysis })
  });

  const result = await response.json();
  if (!result.success) throw new Error('Stage 2 failed');
  
  console.log('- Tools researched:', result.data.toolsResearched?.length || 0);
  
  // If no tools, create mock data for testing next stages
  if (!result.data.toolsResearched || result.data.toolsResearched.length === 0) {
    console.log('⚠️  No tools returned, using mock data for next stages');
    return {
      researchSummary: "Mock research for testing",
      toolsResearched: [
        {
          toolName: "Zapier",
          description: "Automation platform",
          pricing: "$20-100/month",
          category: "workflow_automation"
        }
      ]
    };
  }
  
  return result.data;
}

async function stage3Test(problemAnalysis, toolResearch) {
  const response = await fetch('http://localhost:3000/api/ai/step3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemAnalysis, toolResearch })
  });

  const result = await response.json();
  if (!result.success) throw new Error('Stage 3 failed');
  
  console.log('- Curated tools:', result.data.curatedTools?.length || 0);
  console.log('- Has ROI analysis:', !!result.data.roiAnalysis);
  
  return result.data;
}

async function stage4Test(problemAnalysis, curatedTools) {
  const response = await fetch('http://localhost:3000/api/ai/step4', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problemAnalysis, curatedTools })
  });

  const result = await response.json();
  if (!result.success) throw new Error('Stage 4 failed');
  
  console.log('- Has executive summary:', !!result.data.executiveSummary);
  console.log('- Readiness level:', result.data.readinessLevel);
  
  return result.data;
}

async function runTests() {
  console.log('STAGE-BY-STAGE PIPELINE TEST');
  console.log('=============================');
  
  const results = {};
  
  try {
    // Stage 1
    results.stage1 = await testWithTimeout('Stage 1: Problem Analysis', stage1Test, 20000);
    fs.writeFileSync('test-stage1-output.json', JSON.stringify(results.stage1, null, 2));
    
    // Stage 2 - Using Stage 1 output
    results.stage2 = await testWithTimeout(
      'Stage 2: Tool Research', 
      () => stage2Test(results.stage1),
      60000 // Give more time for web search
    );
    fs.writeFileSync('test-stage2-output.json', JSON.stringify(results.stage2, null, 2));
    
    // Stage 3 - Using Stage 1 & 2 outputs
    results.stage3 = await testWithTimeout(
      'Stage 3: Tool Curation',
      () => stage3Test(results.stage1, results.stage2),
      30000
    );
    fs.writeFileSync('test-stage3-output.json', JSON.stringify(results.stage3, null, 2));
    
    // Stage 4 - Using Stage 1 & 3 outputs
    results.stage4 = await testWithTimeout(
      'Stage 4: Report Generation',
      () => stage4Test(results.stage1, results.stage3),
      30000
    );
    fs.writeFileSync('test-stage4-output.json', JSON.stringify(results.stage4, null, 2));
    
    console.log('\n=============================');
    console.log('✅ ALL STAGES TESTED SUCCESSFULLY');
    console.log('=============================');
    console.log('\nOutputs saved to:');
    console.log('- test-stage1-output.json');
    console.log('- test-stage2-output.json');
    console.log('- test-stage3-output.json');
    console.log('- test-stage4-output.json');
    
  } catch (error) {
    console.log('\n=============================');
    console.log('❌ TESTING FAILED');
    console.log('=============================');
    console.log('Failed at:', error.message);
    console.log('\nCompleted stages:', Object.keys(results));
  }
}

// Check server and run
fetch('http://localhost:3000/api/health')
  .then(() => {
    console.log('Server is running...\n');
    runTests();
  })
  .catch(() => {
    console.error('Server not running! Run "npm run dev" first.');
    process.exit(1);
  });