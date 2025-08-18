import { useEffect, useState } from 'react';

export default function TestAssessments() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('/api/admin/assessments', { credentials: 'include' })
      .then(res => {
        console.log('Response status:', res.status);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setData(data);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Test Assessments API</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <div>
          <p>Total assessments: {data.assessments?.length || 0}</p>
          <pre style={{ background: '#f0f0f0', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2).substring(0, 2000)}
          </pre>
        </div>
      )}
    </div>
  );
}