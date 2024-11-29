import { useState, useEffect } from 'react';
import axios from 'axios';

// Define TypeScript interfaces for expected data shapes
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
}

interface ZipData {
  zip: string;
  name: string;
  lat: string;
  lon: string;
  country: string;
}

function Weather(): JSX.Element {
  // TypeScript ensures the state variables match the correct types
  const [lat, setLat] = useState<string>(''); // Latitude as a string
  const [lon, setLon] = useState<string>(''); // Longitude as a string
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Weather data or null
  const [zip, setZip] = useState<string>(''); // Zip code as a string
  const [zipData, setZipData] = useState<ZipData | null>(null); // Zip data or null

  // `useEffect` watches for changes in lat/lon and triggers `fetchWeather`
  useEffect(() => {
    if (lat && lon) {
      fetchWeather(); // Fetch weather only if latitude and longitude are provided
    }
  }, [lat, lon]);

  // Fetch weather data based on latitude and longitude
  const fetchWeather = async (): Promise<void> => {
    try {
      const baseUrl = 'http://localhost:5001/weather'; // Base API URL
      const params = new URLSearchParams();

      // Ensure both latitude and longitude are provided
      if (lat && lon) {
        params.append('lat', lat);
        params.append('lon', lon);
      } else {
        alert('Please provide a valid latitude and longitude.');
        return;
      }

      // Construct the full API URL with query parameters
      const locationUrl = `${baseUrl}?${params.toString()}`;

      // Make the API call and store the weather data
      const response = await axios.get<WeatherData>(locationUrl);
      setWeatherData(response.data); // Store data in the weatherData state
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Fetch data for a given zip code and extract corresponding latitude and longitude
  const fetchZip = async (): Promise<void> => {
    try {
      const zipUrl = 'http://localhost:5001/zip'; // Base API URL
      const params = new URLSearchParams();

      // Ensure a valid zip code is provided
      if (zip) {
        params.append('zip', zip);
      } else {
        alert('Please provide a valid zip code.');
        return;
      }

      // Construct the full API URL with query parameters
      const zipdataUrl = `${zipUrl}?${params.toString()}`;
      const response = await axios.get<ZipData>(zipdataUrl);
      const data = response.data;

      // Update zipData state and extract latitude/longitude
      setZipData(data);
      setLat(data.lat);
      setLon(data.lon);
    } catch (error) {
      console.error('Error fetching zip data:', error);
    }
  };

  return (
    <div>
      <h2>Weather</h2>

      {/* Input form for latitude, longitude, and zip code */}
      <div>
        <div>
          <label htmlFor="latitude">Latitude:</label>
          {/* Input field for latitude with accessibility improvements */}
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Enter latitude"
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitude:</label>
          {/* Input field for longitude with accessibility improvements */}
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            placeholder="Enter longitude"
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zip Code:</label>
          {/* Input field for zip code with accessibility improvements */}
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter zip code"
          />
        </div>
      </div>

      {/* Buttons to trigger weather or zip data retrieval */}
      <button onClick={fetchWeather}>Get Weather</button>
      <button onClick={fetchZip}>Get Zip Data</button>

      {/* Display weather data if available */}
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

      {/* Display zip data if available */}
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
