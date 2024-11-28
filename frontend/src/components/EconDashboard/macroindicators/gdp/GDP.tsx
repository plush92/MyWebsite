import React, { useState, useEffect } from "react";
import axios from "axios";

const GDP = () => {
  const [gdpData, setgdpData] = useState(null); // Initialize data state
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(null); // Initialize error state

  useEffect(() => {
    const fetchgdpData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("http://127.0.0.1:5000/econ/gdp");
        setgdpData(response.data); // Store data
      } catch (err) {
        console.error("Error fetching gdp data:", err);
        setError("Failed to load gdp data."); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchgdpData();
  }, []);

  // Conditional rendering
  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  if (!gdpData) {
    return <div>No data available</div>; // Handle no data case
  }

  // Assuming each series_id contains `observations`
  return (
    <div>
      <h2>gdp Data</h2>
      <ul>
        {gdpData.gdp?.observations.map((obs, index) => (
          <li key={index}>
            Date: {obs.date}, Value: {obs.value}
          </li>
        ))}
      </ul>

      <h2>Real gdp Data</h2>
      <ul>
        {gdpData.real_gdp?.observations.map((obs, index) => (
          <li key={index}>
            Date: {obs.date}, Value: {obs.value}
          </li>
        ))}
          </ul>
          
                <h2>Nominal gdp Data</h2>
      <ul>
        {gdpData.nominal_gdp?.observations.map((obs, index) => (
          <li key={index}>
            Date: {obs.date}, Value: {obs.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GDP;
