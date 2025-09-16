import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Divider,
} from '@mui/material';

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
  const [lat, setLat] = useState<string>('');
  const [lon, setLon] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [zip, setZip] = useState<string>('');
  const [zipData, setZipData] = useState<ZipData | null>(null);

  useEffect(() => {
    if (lat && lon) {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const fetchWeather = async (): Promise<void> => {
    try {
      const baseUrl = 'http://localhost:5001/weather';
      const params = new URLSearchParams();

      if (lat && lon) {
        params.append('lat', lat);
        params.append('lon', lon);
      } else {
        alert('Please provide a valid latitude and longitude.');
        return;
      }

      const locationUrl = `${baseUrl}?${params.toString()}`;
      const response = await axios.get<WeatherData>(locationUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchZip = async (): Promise<void> => {
    try {
      const zipUrl = 'http://localhost:5001/zip';
      const params = new URLSearchParams();

      if (zip) {
        params.append('zip', zip);
      } else {
        alert('Please provide a valid zip code.');
        return;
      }

      const zipdataUrl = `${zipUrl}?${params.toString()}`;
      const response = await axios.get<ZipData>(zipdataUrl);
      const data = response.data;

      setZipData(data);
      setLat(data.lat);
      setLon(data.lon);
    } catch (error) {
      console.error('Error fetching zip data:', error);
    }
  };

  return (
    <Box maxWidth={500} mx="auto" mt={6} component={Paper} p={4} elevation={3}>
      <Typography variant="h4" fontWeight="bold" mb={2} align="center">
        Weather
      </Typography>
      <Stack spacing={2} mb={2}>
        <TextField
          label="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          label="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          label="Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          fullWidth
          size="small"
        />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" onClick={fetchWeather}>
            Get Weather
          </Button>
          <Button variant="outlined" onClick={fetchZip}>
            Get Zip Data
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ my: 2 }} />
      {weatherData ? (
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            Weather in {weatherData.name}
          </Typography>
          <Typography>Temperature: {weatherData.main.temp} °C</Typography>
          <Typography>Humidity: {weatherData.main.humidity}%</Typography>
          <Typography>Condition: {weatherData.weather[0].description}</Typography>
        </Box>
      ) : (
        <Typography color="text.secondary" mb={2}>
          Please enter details to get weather data
        </Typography>
      )}
      <Divider sx={{ my: 2 }} />
      {zipData ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Zip data for {zipData.zip}
          </Typography>
          <Typography>Name: {zipData.name}</Typography>
          <Typography>Lat: {zipData.lat}</Typography>
          <Typography>Lon: {zipData.lon}</Typography>
          <Typography>Country: {zipData.country}</Typography>
        </Box>
      ) : (
        <Typography color="text.secondary">
          Please enter Zip details to get zip data
        </Typography>
      )}
    </Box>
  );
}

export default Weather;