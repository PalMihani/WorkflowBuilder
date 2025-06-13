import { useState } from 'react';

export const SubmitButton = ({ nodes, edges }) => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pipeline: { nodes, edges } }),
      });

      const result = await response.json();
      setOutput(result);
    } catch (err) {
      console.error('Submission failed:', err);
      setOutput({ error: 'Failed to connect to backend.' });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: '#3B82F6',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '10px 20px',
          fontSize: 16,
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Running...' : 'Submit'}
      </button>

      {output && (
        <pre
          style={{
            marginTop: 16,
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            padding: 12,
            textAlign: 'left',
            whiteSpace: 'pre-wrap',
            fontSize: 14,
          }}
        >
          {JSON.stringify(output, null, 2)}
        </pre>
      )}
    </div>
  );
};
