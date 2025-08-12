// Direct pipeline test
const API_BASE = 'http://localhost:3002/api';

async function testPipelineDirectly() {
  console.log('🔍 Testing pipeline directly with minimal data...\n');
  
  try {
    // Create a minimal test report first
    console.log('1️⃣ Creating test report in database...');
    const testReportId = 'test-' + Date.now();
    
    // Try to trigger pipeline with the simplest possible request
    console.log('2️⃣ Triggering pipeline processing...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(`${API_BASE}/ai-analysis/process-pipeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reportId: 'ac27f5b4-c92a-44b3-981e-9c4cf4695216' // Use the existing report
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Pipeline failed:', error);
    } else {
      const result = await response.json();
      console.log('✅ Pipeline response:', result);
    }
    
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('⏱️ Pipeline timed out after 10 seconds');
      console.log('   This suggests the pipeline is hanging during processing');
    } else {
      console.error('❌ Test failed:', error.message);
    }
  }
}

// Run the test
testPipelineDirectly();