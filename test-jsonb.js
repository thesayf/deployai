// Test script for JSONB update
const reportId = '945de120-088b-4fd6-85c1-5542ea00dbe9';

async function testJSONB() {
  try {
    const response = await fetch('http://localhost:3000/api/ai-analysis/simple-jsonb-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reportId })
    });

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testJSONB();