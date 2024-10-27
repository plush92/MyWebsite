//Create a component that fetches data from http://localhost:5173/weather using Axios
import { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // API call using Axios
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/weather`, );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      {weatherData ? (
        <div>
          <h3>Weather in {weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp} °C</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;

