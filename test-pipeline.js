const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

// Test data with special characters to test JSON escaping
const testData = {
  userEmail: 'test@example.com',
  userCompany: 'ABC "Tech" & Co\'s Solutions', // Company name with quotes and apostrophes
  responses: {
    // Basic info
    industry: 'Technology & Software',
    companySize: '11-50',
    monthlyBudget: '$5,000-$10,000',
    timeline: '1-3 months',
    teamCapability: 'moderate',
    
    // New quiz fields
    efficiencyRating: '3',
    repetitiveTasks: ['Data entry', 'Email responses', 'Report generation'],
    customerExperienceIssues: ['Slow response times', 'Manual ticket routing'],
    moneyLeaks: ['Inefficient processes', 'Manual errors'],
    growthBottlenecks: ['Limited automation', 'Manual scaling issues'],
    currentSystems: ['Slack', 'Google Workspace', 'Basic CRM'],
    desiredOutcome: ['Automate workflows', 'Improve efficiency', 'Scale operations'],
    pastAttempts: ['Tried basic automation tools', 'Failed due to complexity']
  },
  deviceType: 'desktop',
  userAgent: 'Mozilla/5.0 Test Agent',
  userIPAddress: '127.0.0.1'
};

async function testPipeline() {
  console.log('🚀 Starting Pipeline Test...\n');
  
  try {
    // Step 1: Submit quiz
    console.log('📝 Submitting quiz with test data...');
    console.log('Company name:', testData.userCompany);
    
    const submitResponse = await axios.post(`${API_URL}/quiz/submit`, testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Quiz submitted successfully');
    console.log('Response ID:', submitResponse.data.responseId);
    console.log('Report ID:', submitResponse.data.reportId);
    console.log('Token:', submitResponse.data.token);
    console.log('Status:', submitResponse.data.message);
    
    const reportId = submitResponse.data.reportId;
    
    // Step 2: Check status periodically
    console.log('\n⏳ Monitoring pipeline progress...\n');
    
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max
    
    const checkStatus = async () => {
      attempts++;
      
      try {
        const statusResponse = await axios.get(`${API_URL}/reports/status/${reportId}`);
        const status = statusResponse.data.report_status;
        
        console.log(`[Attempt ${attempts}] Status: ${status}`);
        
        // Check each stage
        if (statusResponse.data.stage1_problem_analysis) {
          console.log('  ✅ Stage 1: Problem Analysis - COMPLETE');
        }
        if (statusResponse.data.stage2_tool_research) {
          console.log('  ✅ Stage 2: Tool Research - COMPLETE');
        }
        if (statusResponse.data.stage3_curated_tools) {
          console.log('  ✅ Stage 3: Curated Tools - COMPLETE');
        }
        if (statusResponse.data.stage4_report_content) {
          console.log('  ✅ Stage 4: Report Content - COMPLETE');
        }
        
        if (status === 'completed') {
          console.log('\n🎉 Pipeline completed successfully!');
          console.log('View report at: http://localhost:3000/report/view/' + submitResponse.data.token);
          return true;
        } else if (status === 'failed') {
          console.log('\n❌ Pipeline failed!');
          console.log('Error:', statusResponse.data.error);
          return true;
        }
        
        return false;
      } catch (error) {
        console.log(`[Attempt ${attempts}] Error checking status:`, error.message);
        return false;
      }
    };
    
    // Check status every 5 seconds
    while (attempts < maxAttempts) {
      const isDone = await checkStatus();
      if (isDone) break;
      
      // Wait 5 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    if (attempts >= maxAttempts) {
      console.log('\n⚠️ Timeout: Pipeline did not complete within 5 minutes');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data || error.message);
    if (error.response?.data?.details) {
      console.error('Details:', error.response.data.details);
    }
  }
}

// Run the test
console.log('🔧 Testing Full Pipeline with Special Characters\n');
console.log('Make sure the dev server is running (npm run dev)\n');
testPipeline();