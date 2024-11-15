import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;
const apiKey = process.env.WEATHER_API;

console.log('API Key:', apiKey); // Confirm API key is available

// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL if different
  methods: ['GET'],                // Specify allowed methods
  credentials: true                // Include credentials if needed
}));

// Serve static files if needed (optional)
app.use(express.static('public'));

// Main route to get weather data
app.get('/weather', async (req, res) => {
  console.log('Received request for weather data');
  const { lat, lon } = req.query;

  try {
    let weatherData;

    if (lat && lon) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const response = await axios.get(weatherUrl);
      weatherData = response.data;
      console.log(weatherData);

    }

    res.json(weatherData);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.get('/zip', async (req, res) => {
  console.log('Received request for zip data');
  const { zip } = req.query;

  try {
    let zipData;

    if (zip) {
      const zipUrl = `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${apiKey}`;
      const response = await axios.get(zipUrl);
      zipData = response.data;
      console.log(zipData);
    }

    res.json(zipData);

  } catch (error) {
    console.error('Error fetching zip data:', error);
    res.status(500).json({ error: 'Error fetching zip data' });
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Detect for errors
server.on('error', (error) => {
  console.error(`Failed to start server on port ${PORT}:`, error);
});

//Otherwise, confirm it successfully connected
server.on('listening', () => {
  console.log(`Server successfully started on port ${PORT}`);
});



//cd into the main folder (mywebsite)
//in one terminal, run node '/Users/brendanduffy/Documents/MyWebsite/mywebsite/src/components/Weather/server.js'
//then run "npm run dev" in a separate terminal
//your website will pull up
//and if you go to the route http://localhost:5173/weather, 
//you should see the JSON data populate


