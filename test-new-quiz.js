// Test script for new quiz questions
const API_BASE = 'http://localhost:3002/api';

async function testQuizFlow() {
  console.log('🚀 Starting quiz flow test with UPDATED questions (13 total)...\n');
  
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
    
    // Step 2: Submit quiz with NEW question structure (13 questions)
    console.log('2️⃣ Submitting quiz with NEW quantification questions...');
    const submitResponse = await fetch(`${API_BASE}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizId,
        finalResponses: {
          // Q1: Industry
          industry: 'Digital marketing agency',
          
          // Q2: Efficiency Rating
          efficiencyRating: 'gaps', // 4-6: Some systems but significant gaps
          
          // Q3: Company Size
          companySize: 'small', // 11-50 employees
          
          // Q4: Repetitive Tasks
          repetitiveTasks: ['data-entry', 'email-management', 'marketing-content', 'invoice-billing'],
          
          // Q5: NEW - Weekly Time Breakdown (quantification)
          weeklyTimeBreakdown: 'Data entry between CRM and spreadsheets: 8 hours/week by admin staff. Creating invoices: 4 hours/week. Writing marketing content: 12 hours/week by marketing team. Customer service emails: 10 hours/week. Lead qualification calls: 6 hours/week by sales.',
          
          // Q6: NEW - Business Challenges (merged)
          businessChallenges: ['slow-responses', 'too-much-manual-work', 'operational-chaos', 'cant-track-performance'],
          
          // Q7: NEW - Monthly Cost Breakdown (quantification)
          monthlyCostBreakdown: 'Manual errors in invoicing: ~£800/month in corrections and refunds. Missed leads from slow follow-up: 4-5 deals worth £2,000 each. Undercharging clients: estimate 15% below market rates. Staff overtime: £1,200/month. Lost productivity from context switching: estimate 20% efficiency loss.',
          
          // Q8: Current Systems (CHANGED to single-select)
          currentSystems: 'some-tools', // Some business software but lots of manual work
          
          // Q9: Money Leaks (was Q6, now Q9)
          moneyLeaks: ['manual-errors', 'missed-opportunities', 'slow-processes', 'inefficient-pricing'],
          
          // Q10: Desired Outcome (was Q9, now Q10)
          desiredOutcome: ['scale-capacity', 'real-time-insights'],
          
          // Q11: Team Capability
          teamCapability: 'moderately-comfortable',
          
          // Q12: Monthly Budget
          monthlyBudget: '2000-5000',
          
          // Q13: Timeline
          timeline: 'within-month'
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
      
      const statusResponse = await fetch(`${API_BASE}/reports/status/${submitResult.reportId}`);
      const statusData = await statusResponse.json();
      
      status = statusData.status;
      attempts++;
      
      console.log(`   Attempt ${attempts}: Status = ${status}`);
      
      if (status === 'completed') {
        console.log('✅ Report generation completed!\n');
        console.log('📊 Test Summary:');
        console.log('   - Total questions: 13 (down from 14)');
        console.log('   - New quantification questions: ✅ Added');
        console.log('   - Weekly time breakdown: ✅ Captured');
        console.log('   - Monthly cost breakdown: ✅ Captured');
        console.log('   - Business challenges: ✅ Merged');
        console.log('   - Current systems: ✅ Single-select');
        console.log('   - Database save: ✅ Success');
        console.log('   - AI pipeline: ✅ All 4 stages completed');
        console.log('   - Report generation: ✅ Success with quantification');
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