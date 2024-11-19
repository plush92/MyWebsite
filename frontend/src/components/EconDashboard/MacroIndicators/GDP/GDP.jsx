import React, { useEffect, useState } from 'react';
import axios from 'axios';
// http://127.0.0.1:5000/econ/gdp
const GDP = () => {
  const [gdpData, setGdpData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/econ/gdp')
            .then(response => {
                setGdpData(response.data.observations);  // Assuming the API returns 'observations'
            })
            .catch(error => {
                console.error("Error fetching GDP data:", error);
            });
    }, []);

    return (
        <div>
            <h3>GDP Data</h3>
            <ul>
                {gdpData.map((observation, index) => (
                    <li key={index}>
                        Date: {observation.date} - GDP Value: {observation.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GDP;
