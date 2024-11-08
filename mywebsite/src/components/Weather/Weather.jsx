import { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    try {
      // Initialize base URL
      const baseUrl = 'http://localhost:5001/weather';

      // Create a URLSearchParams object to handle query parameters
      const params = new URLSearchParams();

      // Add appropriate query parameters based on available inputs
      if (lat && lon) {
        params.append('lat', lat);
        params.append('lon', lon);
      } else {
        alert('Please provide a valid latitude and longitude.');
        return;
      }

      // Combine the base URL with the query parameters
      const locationUrl = `${baseUrl}?${params.toString()}`;

      // Fetch weather data
      const response = await axios.get(locationUrl);
      setWeatherData(response.data); // Store weather data in state

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      <h2>Weather</h2>
      <div>
        <div>
          <label>Latitude:</label>
          <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} />
        </div>
        <div>
          <label>Longitude:</label>
          <input type="text" value={lon} onChange={(e) => setLon(e.target.value)} />
        </div>
      </div>
      <button onClick={fetchWeather}>Get Weather</button>

      {weatherData ? (
        <div>
          <h3>Weather in {weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Please enter details to get weather data</p>
      )}
    </div>
  );
}

export default Weather;

