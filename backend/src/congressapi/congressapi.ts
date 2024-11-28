import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

// Simulate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file explicitly
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5001;
const apiKey = process.env.CONGRESS_API;
console.log(apiKey);

if (!apiKey) {
  console.error('Congress.gov API key not found. Check your .env file.');
  process.exit(1); // Exit the application if the API key is missing
}

app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET'],
    credentials: true, // Include credentials if needed
  })
);

app.get('/legislation', async (req, res) => {
  console.log('Congress API request received');

  const format = 'json';
  const limit = 5; // Number of results to return
  const fromDateTime = '2024-10-01T00:00:00Z'; // Example: hardcoded start date
  const toDateTime = '2024-10-31T00:00:00Z'; // Example: hardcoded end date

  try {
    // Congress.gov API URL
    const bill_url = `https://api.congress.gov/v3/bill?fromDateTime=${fromDateTime}&toDateTime=${toDateTime}&format=${format}&limit=${limit}&api_key=${apiKey}`;
    const response = await axios.get(bill_url);

    console.log('Data retrieved from Congress.gov API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error retrieving data from Congress.gov API:', error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: error.response?.data || 'Error retrieving data from Congress.gov API' });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling for server start
server.on('error', (error) => {
  console.error(`Failed to start server on port ${PORT}:`, error.message);
});

server.on('listening', () => {
  console.log(`Server successfully started on port ${PORT}`);
});
