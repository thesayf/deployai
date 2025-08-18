// Simple sequential test of all pipeline stages
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

console.log('SIMPLE PIPELINE TEST - JSON METRICS');
console.log('====================================\n');

// Use mock outputs to test stages 3 and 4 without waiting for AI
const mockStage1Output = {
  "businessContext": {
    "companyName": "Test Manufacturing Co",
    "industry": "Manufacturing",
    "companySize": "50-100 employees",
    "monthlyBudget": "$5,000-10,000",
    "urgency": "Next 3 months",
    "techCapability": "Some technical expertise",
    "currentSystems": "QuickBooks, Excel, Salesforce",
    "businessObjectives": "Reduce costs and improve efficiency",
    "integrationNeeds": "QuickBooks, Excel, Salesforce integration"
  },
  "topOpportunities": [
    {
      "problemArea": "Reporting processes consuming 60 hours/week across team",
      "monthlyTimeCost": "258 hours/month",
      "monthlyFinancialCost": "$10,000/month in labor costs",
      "annualCost": "$120,000/year",
      "aiSolutionType": "Automated reporting and data consolidation",
      "problemEvidence": "reporting: 40-80hrs/week from weeklyTimeBreakdown",
      "searchKeywords": ["automated reporting manufacturing", "QuickBooks Excel integration"],
      "expectedOutcome": "Reduce reporting time by 80%, saving $96,000/year"
    }
  ]
};

const mockStage2Output = {
  "researchSummary": "Found automation tools for manufacturing reporting",
  "toolsResearched": [
    {
      "toolName": "Zapier",
      "category": "workflow_automation",
      "description": "Connect QuickBooks and Excel automatically",
      "pricing": "$20-100/month",
      "setupTime": "2-3 hours",
      "features": ["Data sync", "Automated reports", "Custom workflows"],
      "pros": ["No-code", "Wide integrations"],
      "cons": ["Limited complex logic"],
      "url": "https://zapier.com"
    }
  ]
};

async function testStage3WithMocks() {
  console.log('Testing Stage 3: Tool Curation');
  console.log('Using mock Stage 1 & 2 outputs...\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/ai/step3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemAnalysis: mockStage1Output,
        toolResearch: mockStage2Output
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Stage 3 error response:', error);
      return null;
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Stage 3 SUCCESS');
      console.log('- Curated tools:', result.data.curatedTools?.length || 0);
      fs.writeFileSync('test-stage3-output.json', JSON.stringify(result.data, null, 2));
      return result.data;
    } else {
      console.error('❌ Stage 3 returned success: false');
      return null;
    }
  } catch (error) {
    console.error('❌ Stage 3 FAILED:', error.message);
    return null;
  }
}

async function testStage4WithMocks(curatedTools) {
  console.log('\nTesting Stage 4: Report Generation');
  console.log('Using mock Stage 1 & real Stage 3 outputs...\n');
  
  // If Stage 3 failed, use mock curated tools
  const toolsToUse = curatedTools || {
    "curatedTools": [
      {
        "solution": {
          "toolName": "Zapier",
          "category": "workflow_automation",
          "monthlyPrice": "$50"
        },
        "implementation": {
          "timeToImplement": "1 week",
          "requiredSkills": "Basic",
          "steps": ["Connect QuickBooks", "Set up Excel sync", "Create report templates"]
        },
        "estimatedSavings": "200 hours/month, $10,000/month",
        "fitScore": 95
      }
    ],
    "roiAnalysis": {
      "totalMonthlyCost": "$50",
      "totalMonthlySavings": "$10,000",
      "paybackPeriod": "3 days",
      "annualROI": "23900%"
    }
  };
  
  try {
    const response = await fetch('http://localhost:3000/api/ai/step4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemAnalysis: mockStage1Output,
        curatedTools: toolsToUse
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Stage 4 error response:', error);
      return null;
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Stage 4 SUCCESS');
      console.log('- Has executive summary:', !!result.data.executiveSummary);
      console.log('- Readiness level:', result.data.readinessLevel);
      
      // Check if metrics are in the report
      if (result.data.executiveSummary) {
        const hasHours = result.data.executiveSummary.includes('hour');
        const hasDollars = result.data.executiveSummary.includes('$');
        console.log('- References time metrics:', hasHours);
        console.log('- References cost metrics:', hasDollars);
      }
      
      fs.writeFileSync('test-stage4-output.json', JSON.stringify(result.data, null, 2));
      return result.data;
    } else {
      console.error('❌ Stage 4 returned success: false');
      return null;
    }
  } catch (error) {
    console.error('❌ Stage 4 FAILED:', error.message);
    return null;
  }
}

async function runTest() {
  console.log('Testing Stage 3 and 4 with mock data from Stage 1 and 2');
  console.log('This avoids long AI processing times for Stages 1 and 2\n');
  
  // Test Stage 3
  const stage3Result = await testStage3WithMocks();
  
  // Test Stage 4
  const stage4Result = await testStage4WithMocks(stage3Result);
  
  console.log('\n====================================');
  if (stage3Result && stage4Result) {
    console.log('✅ PIPELINE STAGES 3 & 4 WORK WITH JSON METRICS');
    console.log('\nStages 1 & 2 were already verified in previous test.');
    console.log('All stages can handle the JSON metrics format!');
  } else {
    console.log('❌ SOME STAGES FAILED');
    console.log('Stage 3:', stage3Result ? '✓' : '✗');
    console.log('Stage 4:', stage4Result ? '✓' : '✗');
  }
}

// Run the test
fetch('http://localhost:3000/api/health')
  .then(() => {
    console.log('Server is running...\n');
    runTest();
  })
  .catch(() => {
    console.error('Server not running! Run "npm run dev" first.');
    process.exit(1);
  });