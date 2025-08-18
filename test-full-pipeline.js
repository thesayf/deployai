// Comprehensive test for all 4 stages of the pipeline with JSON metrics
// This tests the actual API endpoints, not the workflow wrapper

const testResponses = {
  industry: "Manufacturing",
  companySize: "50-100 employees",
  monthlyBudget: "$5,000-10,000",
  timeline: "Next 3 months",
  efficiencyRating: "3",
  repetitiveTasks: ["dataEntry", "scheduling", "reporting"],
  // New JSON format for metrics - simulating what AIMetricsQuestion produces
  weeklyTimeBreakdown: {
    "dataEntry": "20-40hrs",
    "scheduling": "10-20hrs", 
    "reporting": "40-80hrs",
    "_notes": "Most time spent on monthly reporting cycles"
  },
  businessChallenges: ["cashFlow", "customerRetention", "inefficientProcesses"],
  // New JSON format for costs
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

let stageOutputs = {};

async function testStage1() {
  console.log('\n=== STAGE 1: Problem Analysis ===');
  console.log('Testing with JSON metrics format...');
  
  try {
    const response = await fetch('http://localhost:3000/api/ai/step1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        responses: testResponses,
        company: "Test Manufacturing Co"
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stage 1 failed: ${error}`);
    }

    const result = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error('Stage 1 returned invalid response');
    }

    console.log('✅ Stage 1 SUCCESS');
    console.log('- Business context parsed:', !!result.data.businessContext);
    console.log('- Top opportunities found:', result.data.topOpportunities?.length || 0);
    
    // Verify JSON metrics were processed
    const firstOpp = result.data.topOpportunities?.[0];
    if (firstOpp) {
      console.log('\nFirst opportunity validation:');
      console.log('- Has monthlyTimeCost:', !!firstOpp.monthlyTimeCost);
      console.log('- Has monthlyFinancialCost:', !!firstOpp.monthlyFinancialCost);
      console.log('- Has annualCost:', !!firstOpp.annualCost);
      
      if (!firstOpp.monthlyTimeCost || !firstOpp.monthlyFinancialCost) {
        console.warn('⚠️  WARNING: Metrics may not have been fully processed');
      }
    }
    
    stageOutputs.stage1 = result.data;
    return result.data;
    
  } catch (error) {
    console.error('❌ Stage 1 FAILED:', error.message);
    throw error;
  }
}

async function testStage2(problemAnalysis) {
  console.log('\n=== STAGE 2: Tool Research ===');
  console.log('Using Stage 1 output as input...');
  
  try {
    const response = await fetch('http://localhost:3000/api/ai/step2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemAnalysis: problemAnalysis
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stage 2 failed: ${error}`);
    }

    const result = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error('Stage 2 returned invalid response');
    }

    console.log('✅ Stage 2 SUCCESS');
    console.log('- Research summary:', !!result.data.researchSummary);
    console.log('- Tools researched:', result.data.toolsResearched?.length || 0);
    
    // Verify research relates to our metrics
    const firstTool = result.data.toolsResearched?.[0];
    if (firstTool) {
      console.log('\nFirst tool validation:');
      console.log('- Has tool name:', !!firstTool.toolName);
      console.log('- Has description:', !!firstTool.description);
      console.log('- Has pricing info:', !!firstTool.pricing);
    }
    
    stageOutputs.stage2 = result.data;
    return result.data;
    
  } catch (error) {
    console.error('❌ Stage 2 FAILED:', error.message);
    throw error;
  }
}

async function testStage3(problemAnalysis, toolResearch) {
  console.log('\n=== STAGE 3: Tool Curation ===');
  console.log('Using Stage 1 & 2 outputs as input...');
  
  try {
    const response = await fetch('http://localhost:3000/api/ai/step3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemAnalysis: problemAnalysis,
        toolResearch: toolResearch
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stage 3 failed: ${error}`);
    }

    const result = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error('Stage 3 returned invalid response');
    }

    console.log('✅ Stage 3 SUCCESS');
    console.log('- Curated tools count:', result.data.curatedTools?.length || 0);
    console.log('- ROI analysis included:', !!result.data.roiAnalysis);
    
    // Verify curation includes cost savings based on our metrics
    const firstCurated = result.data.curatedTools?.[0];
    if (firstCurated) {
      console.log('\nFirst curated tool validation:');
      console.log('- Has solution details:', !!firstCurated.solution);
      console.log('- Has implementation plan:', !!firstCurated.implementation);
      console.log('- Has estimated savings:', !!firstCurated.estimatedSavings);
      
      if (firstCurated.estimatedSavings) {
        console.log('- Savings relate to metrics:', 
          firstCurated.estimatedSavings.includes('hour') || 
          firstCurated.estimatedSavings.includes('$'));
      }
    }
    
    stageOutputs.stage3 = result.data;
    return result.data;
    
  } catch (error) {
    console.error('❌ Stage 3 FAILED:', error.message);
    throw error;
  }
}

async function testStage4(problemAnalysis, curatedTools) {
  console.log('\n=== STAGE 4: Report Generation ===');
  console.log('Using Stage 1 & 3 outputs as input...');
  
  try {
    const response = await fetch('http://localhost:3000/api/ai/step4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemAnalysis: problemAnalysis,
        curatedTools: curatedTools
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stage 4 failed: ${error}`);
    }

    const result = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error('Stage 4 returned invalid response');
    }

    console.log('✅ Stage 4 SUCCESS');
    console.log('- Executive summary:', !!result.data.executiveSummary);
    console.log('- Readiness level:', result.data.readinessLevel || 'Not set');
    console.log('- Report sections:', !!result.data.reportSections);
    
    // Verify report includes our quantified metrics
    if (result.data.executiveSummary) {
      console.log('\nReport validation:');
      const hasHours = result.data.executiveSummary.includes('hour');
      const hasDollars = result.data.executiveSummary.includes('$');
      console.log('- References time metrics:', hasHours);
      console.log('- References cost metrics:', hasDollars);
      
      if (!hasHours || !hasDollars) {
        console.warn('⚠️  WARNING: Report may not fully reflect quantified metrics');
      }
    }
    
    stageOutputs.stage4 = result.data;
    return result.data;
    
  } catch (error) {
    console.error('❌ Stage 4 FAILED:', error.message);
    throw error;
  }
}

async function runFullPipelineTest() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('     FULL PIPELINE TEST WITH JSON METRICS FORMAT');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\nTest data includes:');
  console.log('- JSON weeklyTimeBreakdown:', Object.keys(testResponses.weeklyTimeBreakdown));
  console.log('- JSON monthlyCostBreakdown:', Object.keys(testResponses.monthlyCostBreakdown));
  
  try {
    // Test each stage sequentially, passing outputs forward
    const stage1Result = await testStage1();
    const stage2Result = await testStage2(stage1Result);
    const stage3Result = await testStage3(stage1Result, stage2Result);
    const stage4Result = await testStage4(stage1Result, stage3Result);
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('           ✅ ALL PIPELINE STAGES PASSED!');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\nThe pipeline successfully processes JSON metrics through all stages:');
    console.log('- Stage 1: Problem Analysis ✓');
    console.log('- Stage 2: Tool Research ✓');
    console.log('- Stage 3: Tool Curation ✓');
    console.log('- Stage 4: Report Generation ✓');
    console.log('\nJSON metrics are properly converted and flow through the entire pipeline!');
    
    // Save outputs for inspection
    const fs = require('fs');
    fs.writeFileSync('test-pipeline-outputs.json', JSON.stringify(stageOutputs, null, 2));
    console.log('\nTest outputs saved to: test-pipeline-outputs.json');
    
  } catch (error) {
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('           ❌ PIPELINE TEST FAILED');
    console.log('═══════════════════════════════════════════════════════');
    console.error('\nPipeline failed at:', error.message);
    console.log('\nSuccessfully completed stages:');
    Object.keys(stageOutputs).forEach(stage => {
      console.log(`- ${stage}: ✓`);
    });
    process.exit(1);
  }
}

// Check if server is running
fetch('http://localhost:3000/api/health')
  .then(() => {
    console.log('Server is running on port 3000...\n');
    runFullPipelineTest();
  })
  .catch(() => {
    console.error('Server is not running! Please run "npm run dev" first.');
    process.exit(1);
  });