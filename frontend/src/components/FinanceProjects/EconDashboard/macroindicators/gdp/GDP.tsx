import React, { useState, useEffect } from "react";
import axios from "axios";
import GDPChart from "./GDPChart"; // Import the new chart component
import {
  GdpApiResponse,
  ProcessedGdpData,
  FredObservation,
} from "../../../../../types/fredApi";

const GDP = () => {
  const [gdpData, setGdpData] = useState<ProcessedGdpData | null>(null); // Initialize data state
  const [rawData, setRawData] = useState<GdpApiResponse | null>(null); // Store raw API response
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState<string | null>(null); // Initialize error state

  useEffect(() => {
    const fetchGdpData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get<GdpApiResponse>(
          "http://127.0.0.1:5000/econ/gdp"
        );
        const data = response.data;
        setRawData(data); // Store raw response
        setGdpData({
          labels:
            data.gdp?.observations.map((obs: FredObservation) => obs.date) ||
            [], // Map the dates as labels
          gdpValues:
            data.gdp?.observations.map((obs: FredObservation) => obs.value) ||
            [], // Map the values for the chart
        });
      } catch (err) {
        console.error("Error fetching gdp data:", err);
        setError("Failed to load GDP data.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchGdpData();
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

  // Render GDP data and chart
  return (
    <div>
      <h2>GDP Data</h2>
      <GDPChart data={gdpData} />{" "}
      {/* Pass the processed data to the chart component */}
      <h3>Raw Data</h3>
      <h4>GDP Data</h4>
      <ul>
        {rawData?.gdp?.observations.map(
          (obs: FredObservation, index: number) => (
            <li key={index}>
              Date: {obs.date}, Value: {obs.value}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default GDP;
