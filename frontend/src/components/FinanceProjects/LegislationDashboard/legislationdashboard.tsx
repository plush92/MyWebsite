import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LegislationDashboard = () => {
  const [data, setData] = useState(null); // Store API response
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message

  // Fetch data from the backend API
  const fetchLegislation = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5001/legislation');
      setData(response.data); // Save data to state
    } catch (err) {
      console.error('Error fetching legislation data:', err.message);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchLegislation();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Legislation Data Viewer</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        <div>
          <h2>Results</h2>
          <ul>
            {data.bills && data.bills.length > 0 ? (
              data.bills.map((bill, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <strong>Bill Title:</strong> {bill.title || 'N/A'} <br />
                  <strong>Bill ID:</strong> {bill.bill_id || 'N/A'} <br />
                  <strong>Introduced Date:</strong>{' '}
                  {bill.introduced_date || 'N/A'}
                </li>
              ))
            ) : (
              <p>No bills found in the specified date range.</p>
            )}
          </ul>
        </div>
      ) : (
        !loading && <p>No data available. Please refresh.</p>
      )}
    </div>
  );
};

export default LegislationDashboard;
