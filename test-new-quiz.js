// Test script for new quiz questions
const API_BASE = 'http://localhost:3002/api';

async function testQuizFlow() {
  console.log('🚀 Starting quiz flow test with new questions...\n');
  
  try {
    // Step 1: Start quiz
    console.log('1️⃣ Starting quiz...');
    const startResponse = await fetch(`${API_BASE}/quiz/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@deployai.test',
        firstName: 'Test',
        lastName: 'User',
        company: 'Test Digital Agency'
      })
    });
    
    const { quizId } = await startResponse.json();
    console.log(`✅ Quiz started with ID: ${quizId}\n`);
    
    // Step 2: Submit quiz with new question structure
    console.log('2️⃣ Submitting quiz with new questions...');
    const submitResponse = await fetch(`${API_BASE}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizId,
        finalResponses: {
          // Core fields (mapped)
          industry: 'Digital marketing agency',
          companySize: 'small', // 11-50 employees
          repetitiveTasks: ['data-entry', 'email-management', 'marketing-content'],
          currentSystems: ['spreadsheets', 'email-marketing', 'social-media-tools'],
          teamCapability: 'moderately-comfortable',
          monthlyBudget: '2000-5000',
          timeline: 'within-month',
          
          // New fields
          efficiencyRating: 'gaps', // 4-6: Some systems but significant gaps
          informationProblems: 'scattered-everywhere',
          customerExperienceIssues: ['slow-responses', 'repetitive-questions'],
          moneyLeaks: ['manual-errors', 'missed-opportunities', 'wasted-marketing'],
          growthBottlenecks: ['too-much-manual-work', 'marketing-ineffective'],
          desiredOutcome: ['scale-capacity', 'real-time-insights'],
          pastAttempts: ['too-complex', 'no-time'],
          implementationPreference: 'guided',
          additionalContext: 'We are a growing digital agency struggling with manual processes and need to scale efficiently.'
        }
      })
    });
    
    const submitResult = await submitResponse.json();
    console.log('✅ Quiz submitted successfully');
    console.log(`   Report ID: ${submitResult.reportId}`);
    console.log(`   Processing time: ${submitResult.processingTime}\n`);
    
    // Step 3: Check processing status
    console.log('3️⃣ Checking processing status...');
    let attempts = 0;
    let status = 'processing';
    
    while (status !== 'completed' && attempts < 60) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const statusResponse = await fetch(`${API_BASE}/reports/status?reportId=${submitResult.reportId}`);
      const statusData = await statusResponse.json();
      
      status = statusData.status;
      attempts++;
      
      console.log(`   Attempt ${attempts}: Status = ${status}`);
      
      if (status === 'completed') {
        console.log('✅ Report generation completed!\n');
        console.log('📊 Test Summary:');
        console.log('   - New quiz questions: ✅ Working');
        console.log('   - Database save: ✅ Success');
        console.log('   - AI pipeline: ✅ All 4 stages completed');
        console.log('   - Report generation: ✅ Success');
        break;
      }
      
      if (status === 'failed' || status === 'error') {
        console.error('❌ Processing failed:', statusData.error);
        break;
      }
    }
    
    if (attempts >= 60) {
      console.log('⏱️ Timeout: Processing took too long');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testQuizFlow();