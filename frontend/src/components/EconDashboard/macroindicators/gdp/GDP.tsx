import React, { useState, useEffect } from "react";
import axios from "axios";

// Define TypeScript interfaces for the expected data structures (Observation, GDPSeries, GDPData)

//Observation: the data values retrieved from the FRED api: obsevations: {realtime_start: (date), realtime_end: (date), date: (date), value: (value)} 
interface Observation {
  date: string; // The date of the observation
  value: string; // The value associated with the date
}

interface GdpSeries {
  observations: Observation[]; // An array of observations
}

interface GdpData {
  gdp?: GdpSeries; // Optional GDP series
  real_gdp?: GdpSeries; // Optional Real GDP series
  nominal_gdp?: GdpSeries; // Optional Nominal GDP series
}

const GDP: React.FC = () => { //React.FC = "React Functional Component" - typescript notation for defining consistent types for react components.
  // State variables with their respective TypeScript types
  const [gdpData, setGdpData] = useState<GdpData | null>(null); 
  // `gdpData` holds the fetched data or `null` if not available.

  const [loading, setLoading] = useState<boolean>(true); 
  // Boolean to track if data is still loading.

  const [error, setError] = useState<string | null>(null); 
  // A string to store error messages, or `null` if there's no error.

  // `useEffect` to handle side effects, fetching GDP data on component mount
  useEffect(() => {
    const fetchGdpData = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching data
        const response = await axios.get<GdpData>("http://127.0.0.1:5000/econ/gdp"); 
        // `axios.get` uses `<GdpData>` to ensure response matches the expected data shape.
        
        setGdpData(response.data); // Store the fetched data in state
      } catch (err) {
        console.error("Error fetching GDP data:", err); // Log the error to the console
        setError("Failed to load GDP data."); // Set an error message to display
      } finally {
        setLoading(false); // Set loading state to false after completion
      }
    };

    fetchGdpData(); // Call the data fetching function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Conditional rendering based on the state of loading, error, and data availability
  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div>{error}</div>; // Display an error message if an error occurred
  }

  if (!gdpData) {
    return <div>No data available</div>; // Display a fallback message if no data is available
  }

  // Render data for each GDP series if it exists
  return (
    <div>
      <h2>GDP Data</h2>

      {/* Render the GDP series if available */}
      {gdpData.gdp && (
        <>
          <h3>GDP</h3>
          <ul>
            {gdpData.gdp.observations.map((obs, index) => (
              <li key={index}>
                Date: {obs.date}, Value: {obs.value} 
                {/* Access date and value from each observation */}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Render the Real GDP series if available */}
      {gdpData.real_gdp && (
        <>
          <h3>Real GDP</h3>
          <ul>
            {gdpData.real_gdp.observations.map((obs, index) => (
              <li key={index}>
                Date: {obs.date}, Value: {obs.value}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Render the Nominal GDP series if available */}
      {gdpData.nominal_gdp && (
        <>
          <h3>Nominal GDP</h3>
          <ul>
            {gdpData.nominal_gdp.observations.map((obs, index) => (
              <li key={index}>
                Date: {obs.date}, Value: {obs.value}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default GDP;

