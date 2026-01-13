// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import express, { Request, Response } from 'express';
// import axios from 'axios';
// import cors from 'cors';

// // Simulate __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load .env file explicitly
// dotenv.config({ path: path.resolve(__dirname, '../.env') });

// // Initialize Express
// const app = express();
// const PORT = process.env.PORT || 5001;
// const apiKey = process.env.WEATHER_API;

// console.log('API Key:', apiKey || 'Not Found'); // Debugging API Key

// // Apply CORS middleware
// app.use(cors({
//   origin: 'http://localhost:5173', // Replace with your frontend URL if different
//   methods: ['GET'],                // Specify allowed methods
//   credentials: true                // Include credentials if needed
// }));

// // Serve static files (optional)
// app.use(express.static('public'));

// // Main route to get weather data
// app.get('/weather', async (req, res) => {
//   console.log('Received request for weather data');
//   const { lat, lon } = req.query;

//   try {
//     if (!lat || !lon) {
//       return res.status(400).json({ error: 'Latitude and Longitude are required' });
//     }

//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//     const response = await axios.get(weatherUrl);
//     console.log(response.data);
//     res.json(response.data);

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       res
//         .status(error.response?.status || 500)
//         .json({ error: error.response?.data || 'Error retrieving weather data' });
//     } else if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: 'Unknown error' });
//     }
//   }
// });

// // Route to get data by ZIP code
// app.get('/zip', async (req: Request, res: Response) => {
//   console.log('Received request for zip data');
//   const { zip } = req.query;

//   try {
//     if (!zip) {
//       return res.status(400).json({ error: 'ZIP code is required' });
//     }

//     const zipUrl = `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${apiKey}`;
//     const response = await axios.get(zipUrl);
//     console.log(response.data);
//     res.json(response.data);

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       res
//         .status(error.response?.status || 500)
//         .json({ error: error.response?.data || 'Error fetching zip data' });
//     } else if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: 'Unknown error' });
//     }
//   }
// });

// // Start the server
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Error handling for server start
// server.on('error', (error) => {
//   console.error(`Failed to start server on port ${PORT}:`, error.message);
// });

// // Confirmation of server connection
// server.on('listening', () => {
//   console.log(`Server successfully started on port ${PORT}`);
// });

// //cd into the main folder (mywebsite)
// //in one terminal, run node '/Users/brendanduffy/Documents/MyWebsite/mywebsite/src/components/Weather/server.js'
// //then run "npm run dev" in a separate terminal
// //your website will pull up
// //and if you go to the route http://localhost:5173/weather,
// //you should see the JSON data populate
