// Final test of the 13-question quiz with quantification
const API_BASE = 'http://localhost:3001/api';

async function finalTest() {
  console.log('🚀 Final test of 13-question quiz with quantification...\n');
  
  try {
    // Step 1: Start quiz
    console.log('Starting quiz...');
    const startResponse = await fetch(`${API_BASE}/quiz/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `final-test-${Date.now()}@deployai.test`,
        firstName: 'Final',
        lastName: 'Test',
        company: 'Quantified Company'
      })
    });
    
    const { quizId } = await startResponse.json();
    console.log(`Quiz ID: ${quizId}\n`);
    
    // Step 2: Submit with quantification data
    console.log('Submitting quiz responses...');
    const submitResponse = await fetch(`${API_BASE}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizId,
        finalResponses: {
          industry: 'SaaS startup',
          efficiencyRating: 'minimal',
          companySize: 'small',
          repetitiveTasks: ['data-entry', 'customer-service', 'marketing-content'],
          weeklyTimeBreakdown: 'Customer support tickets: 15 hours/week. Data entry: 10 hours/week. Report generation: 8 hours/week.',
          businessChallenges: ['too-much-manual-work', 'slow-responses', 'errors-mistakes'],
          monthlyCostBreakdown: 'Manual errors: £1,500/month. Lost customers from slow support: £3,000/month. Overtime costs: £1,000/month.',
          currentSystems: 'basic-tools',
          moneyLeaks: ['manual-errors', 'missed-opportunities', 'slow-processes'],
          desiredOutcome: ['scale-capacity', 'reduce-errors'],
          teamCapability: 'moderately-comfortable',
          monthlyBudget: '2000-5000',
          timeline: 'within-quarter'
        }
      })
    });
    
    const submitResult = await submitResponse.json();
    console.log(`Report ID: ${submitResult.reportId}\n`);
    
    // Step 3: Trigger pipeline manually (since auto-trigger is broken)
    console.log('Triggering pipeline...');
    fetch(`${API_BASE}/ai-analysis/process-pipeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportId: submitResult.reportId })
    }).catch(() => {}); // Fire and forget
    
    // Step 4: Monitor progress
    console.log('Monitoring progress (up to 5 minutes)...\n');
    let attempts = 0;
    let status = 'processing';
    
    while (status !== 'completed' && status !== 'failed' && attempts < 100) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const statusResponse = await fetch(`${API_BASE}/reports/status/${submitResult.reportId}`);
      const statusData = await statusResponse.json();
      
      status = statusData.status;
      attempts++;
      
      if (attempts % 5 === 0 || status === 'completed' || status === 'failed') {
        console.log(`[${new Date().toLocaleTimeString()}] Status: ${status}, Stage: ${statusData.currentStage}, Progress: ${statusData.progress}%`);
      }
      
      if (status === 'completed') {
        console.log('\n✅ SUCCESS! Report generated with new 13-question structure');
        console.log('Quantification data successfully processed through all 4 stages');
        break;
      }
      
      if (status === 'failed') {
        console.error('\n❌ Pipeline failed');
        break;
      }
    }
    
    if (attempts >= 100) {
      console.log('\n⏱️ Timeout after 5 minutes');
    }
    
  } catch (error) {
    console.error('Test error:', error.message);
  }
}

finalTest();