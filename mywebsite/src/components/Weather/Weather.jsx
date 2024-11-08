import { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [zip, setZip] = useState('');
  const [zipData, setzipData] = useState(null);

  useEffect(() => { //uses hook to detect if lat/lon are entered
    if (lat && lon) {
      fetchWeather();
    }
  }, [lat, lon]); //if lat/lon are entered, fetchWeather when lat and lon are set

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

  const fetchZip = async () => {
    try {
      const zipUrl = 'http://localhost:5001/zip';
      const params = new URLSearchParams();

      if (zip) {
        params.append('zip', zip)
      } else {
        alert('Please provide a valid zip code');
        return;
      }

      const zipdataUrl = `${zipUrl}?${params.toString()}`;
      const response = await axios.get(zipdataUrl);
      const data = response.data;
      setzipData(data);

      setLat(data.lat);
      setLon(data.lon);

    } catch (error) {
      console.error("Error fetching zip data:", error);
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
        <div>
          <label>Zip Code:</label>
          <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
        </div>
      </div>
      <button onClick={fetchWeather}>Get Weather</button>
      <button onClick={fetchZip}>Get Zip Data</button>

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
      {zipData ? (
        <div>
          <h3>Zip data for {zipData.zip}</h3>
          <p>Name: {zipData.name}</p>
          <p>Lat: {zipData.lat}</p>
          <p>Lon: {zipData.lon}</p>
          <p>Country: {zipData.country}</p>
        </div>
      ) : (
          <p>Please enter Zip details to get zip data</p>
      )}
    </div>
  );
}

export default Weather;

