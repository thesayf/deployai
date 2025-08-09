// Test script to check columns
async function checkColumns() {
  try {
    const response = await fetch('http://localhost:3000/api/ai-analysis/check-columns', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.log('Response status:', response.status);
      const text = await response.text();
      console.log('Response text:', text.substring(0, 200));
      return;
    }

    const data = await response.json();
    console.log('Columns Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

checkColumns();