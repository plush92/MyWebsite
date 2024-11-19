import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GDP = () => {
  const [gdpData, setGdpData] = useState(null);

  useEffect(() => {
    const fetchGDPData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/econ/gdp'); // Adjust for backend URL
        setGdpData(response.data);
      } catch (error) {
        console.error('Error fetching GDP data:', error);
      }
    };

    fetchGDPData();
  }, []);

  return (
    <div>
      <h1>Economic Dashboard: GDP Data</h1>
      {gdpData ? (
        <div>
          <p>Real GDP: {gdpData.real_gdp}</p>
          <p>Nominal GDP: {gdpData.nominal_gdp}</p>
          <p>Growth Rate: {gdpData.growth_rate}%</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GDP;
