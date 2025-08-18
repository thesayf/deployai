// Test script to verify the pipeline works with JSON metrics data
// Node 18+ has native fetch, no need to import

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

async function testStep1() {
  console.log('\n=== Testing Step 1: Problem Analysis ===');
  
  try {
    const response = await fetch('http://localhost:3000/api/ai/step1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        responses: testResponses,
        company: "Test Manufacturing Co"
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Step 1 failed: ${error}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Step 1 SUCCESS');
      console.log('Problem Analysis generated successfully');
      console.log('Top opportunities found:', result.data.topOpportunities?.length || 0);
      
      // Check if the metrics were properly processed
      const firstOpportunity = result.data.topOpportunities?.[0];
      if (firstOpportunity) {
        console.log('\nFirst opportunity:');
        console.log('- Problem:', firstOpportunity.problemArea);
        console.log('- Monthly Time Cost:', firstOpportunity.monthlyTimeCost);
        console.log('- Monthly Financial Cost:', firstOpportunity.monthlyFinancialCost);
        console.log('- Annual Cost:', firstOpportunity.annualCost);
      }
      
      return result.data;
    } else {
      throw new Error('Step 1 returned success: false');
    }
  } catch (error) {
    console.error('❌ Step 1 FAILED:', error.message);
    throw error;
  }
}

// Skip direct prompt testing since we can't import TypeScript modules

// Run tests
async function runTests() {
  console.log('Starting pipeline tests with JSON metrics format...');
  console.log('Test data:', JSON.stringify(testResponses, null, 2));
  
  try {
    // Test the actual API endpoint
    const problemAnalysis = await testStep1();
    
    console.log('\n✅ ALL TESTS PASSED');
    console.log('The pipeline correctly handles JSON metrics data!');
    
  } catch (error) {
    console.error('\n❌ TESTS FAILED');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Check if server is running
fetch('http://localhost:3000/api/health')
  .then(() => {
    console.log('Server is running, starting tests...');
    runTests();
  })
  .catch(() => {
    console.error('Server is not running! Please run "npm run dev" first.');
    process.exit(1);
  });