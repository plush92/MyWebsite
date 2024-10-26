import { useState, useEffect } from 'react';
import express from "express";
import axios from "axios";

const PORT = 5173; //the port should be dynamic, right? not "5070" because the port number might change. how do i make this dynamic?
const app = express();

const apiKey = "a257574df2d375ad4375144c64a91593"; //API Key

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?`; //requires lat/lon
const api_direct = "http://api.openweathermap.org/geo/1.0/direct?" //enter city name, return all results matching city name. put a limit
const api_zip = "http://api.openweathermap.org/geo/1.0/zip?" //search by zip code

const lon = "27.264317"
const lat = "-80.285796"
const city = "London"

app.use(express.static("public"));

//Create GET route for our current weather (you can probably start simple: Miami, FL)
//Eventually you will create a dropdown menu for the user to select their filters (name, cidy ID, geographic coordinates, or ZIP code)
//Remember to handle errors

//Parameters Needed:
//1. Lat 2. Lon 3. AppID (API Key)
//We need to also use the Geocoder API to convert city names and zip codes to Lat/Lon coordinates

// name Name of the found location
// local_names
// local_names.[language code] Name of the found location in different languages. The list of names can be different for different locations.
// local_names.ascii Internal field
// local_names.feature_name Internal field
// lat Geographical coordinates of the found location (latitude)
// lon Geographical coordinates of the found location (longitude)
// country Country of the found location
// state (where available) State of the found location

// Route to get weather data
app.get('/weather', async (req, res) => {
  try {
    const response = await axios.get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('Error retrieving weather data');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});