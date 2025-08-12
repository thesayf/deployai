// Production script to fix stuck report
// This needs to be run with production environment variables

const reportId = 'b97964b2-3519-4c88-9e0e-3a3c5e449d99';

async function fixStuckReportProduction() {
  console.log('=====================================');
  console.log('Fixing stuck report in PRODUCTION');
  console.log('Report ID:', reportId);
  console.log('=====================================\n');
  
  // Use the production URL
  const baseUrl = 'https://deployai.studio';
  const apiKey = process.env.INTERNAL_API_KEY;
  
  if (!apiKey) {
    console.error('ERROR: INTERNAL_API_KEY environment variable is not set!');
    console.log('Please set it before running this script.');
    return;
  }
  
  console.log('Attempting to re-run the pipeline with force flag...');
  console.log('URL:', `${baseUrl}/api/ai-analysis/process-pipeline`);
  
  try {
    const response = await fetch(`${baseUrl}/api/ai-analysis/process-pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        reportId: reportId,
        force: true
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('\n✅ SUCCESS: Pipeline completed!');
      console.log('Status:', result.status);
      console.log('Message:', result.message);
      console.log('Processing time:', result.processingTime, 'seconds');
      console.log('\n✅ The report should now be completed and the email sent to the client.');
      return;
    } else {
      const errorText = await response.text();
      console.log('\n❌ Pipeline request failed!');
      console.log('Status:', response.status);
      console.log('Response:', errorText);
      
      // Try to parse as JSON if possible
      try {
        const errorJson = JSON.parse(errorText);
        console.log('\nError details:', errorJson);
      } catch (e) {
        // Not JSON, already logged as text
      }
    }
  } catch (error) {
    console.error('\n❌ Network error calling pipeline:', error.message);
    console.error('Full error:', error);
  }
}

// Instructions for running this script
console.log('=====================================');
console.log('HOW TO RUN THIS SCRIPT IN PRODUCTION:');
console.log('=====================================');
console.log('');
console.log('Option 1: Run via Vercel CLI');
console.log('---------------------------');
console.log('1. Install Vercel CLI: npm i -g vercel');
console.log('2. Link to project: vercel link');
console.log('3. Pull env vars: vercel env pull .env.production');
console.log('4. Run: INTERNAL_API_KEY=your_key node fix-stuck-report-production.js');
console.log('');
console.log('Option 2: Run directly with API key');
console.log('---------------------------');
console.log('INTERNAL_API_KEY=your_actual_api_key node fix-stuck-report-production.js');
console.log('');
console.log('Option 3: Use curl directly');
console.log('---------------------------');
console.log('curl -X POST https://deployai.studio/api/ai-analysis/process-pipeline \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -H "x-api-key: your_internal_api_key" \\');
console.log(`  -d '{"reportId": "${reportId}", "force": true}'`);
console.log('');
console.log('=====================================\n');

// Only run if INTERNAL_API_KEY is set
if (process.env.INTERNAL_API_KEY) {
  fixStuckReportProduction().catch(console.error);
} else {
  console.log('⚠️  INTERNAL_API_KEY not set. Please set it and run again.');
  console.log('   Example: INTERNAL_API_KEY=your_key node fix-stuck-report-production.js');
}