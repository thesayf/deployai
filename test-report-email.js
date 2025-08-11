/**
 * Test script for report email functionality
 * Run this to test if the email endpoint is working correctly
 */

const testReportEmail = async () => {
  console.log('Testing report email endpoint...\n');
  
  // Test data - you'll need to update these with real values
  const testData = {
    reportId: 'YOUR_REPORT_ID_HERE', // Update with a real report ID
    userEmail: 'test@example.com',   // Update with your test email
    firstName: 'Test',
    lastName: 'User',
    company: 'Test Company'
  };
  
  console.log('Sending POST request to /api/reports/send-report-email');
  console.log('Test data:', testData);
  
  try {
    const response = await fetch('http://localhost:3001/api/reports/send-report-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('\n✅ SUCCESS: Email sent successfully\!');
      console.log('Response:', result);
    } else {
      console.log('\n❌ ERROR: Failed to send email');
      console.log('Status:', response.status);
      console.log('Error:', result);
    }
  } catch (error) {
    console.error('\n❌ EXCEPTION:', error.message);
  }
};

// Instructions
console.log('=================================');
console.log('REPORT EMAIL TEST SCRIPT');
console.log('=================================');
console.log('\nBefore running this test:');
console.log('1. Update the testData object with:');
console.log('   - A valid report ID from your database');
console.log('   - Your test email address');
console.log('2. Make sure the dev server is running on port 3001');
console.log('3. Run: node test-report-email.js');
console.log('\n=================================\n');

// Uncomment to run the test
// testReportEmail();
EOF < /dev/null