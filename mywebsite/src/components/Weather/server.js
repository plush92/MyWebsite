import express from "express";
import axios from "axios";

const PORT = 5001;
const app = express();

// const apiKey = "a257574df2d375ad4375144c64a91593"; //API Key

app.use(express.static("public"));

app.get('/weather', async (req, res) => {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=34.0901&lon=-118.4065&appid=a257574df2d375ad4375144c64a91593');
    res.json(response.data);
    console.log(response.data) //you should also see the JSON data populate in the terminal
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('Error retrieving weather data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//when you run "node server.js" in terminal, 
//and go to the route http://localhost:5173/weather, 
//you should see the JSON data populate
