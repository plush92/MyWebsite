import express from "express";  // Importing the Express framework for server-side routing
import bodyParser from "body-parser";  // Importing body-parser to parse incoming request bodies
import axios from "axios";  // Importing axios for making HTTP requests

const app = express();  // Creating an instance of an Express application
const port = 3000;  // Defining the port number on which the server will listen

app.use(express.static("public"));  // Serving static files (e.g., CSS, JavaScript) from the "public" directory
app.use(bodyParser.urlencoded({ extended: true }));  // Parsing URL-encoded request bodies (e.g., form submissions)

// Step 1: Handle GET requests to the home page
app.get("/", async (req, res) => {
  try {
    // Fetch a random activity from the API
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;  // Extracting the data from the API response. the .data method is an AXIOS convention

    // Render the index.ejs template with the activity data
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to fetch random activity:", error.message);  // Logging the error if the API request fails

    // Render the index.ejs template with an error message
    res.render("index.ejs", {
      error: "Failed to fetch random activity. Please try again later.",
    });
  }
});

// Step 2: Handle POST requests to filter activities based on user input
app.post("/", async (req, res) => {
  try {
    // Extracting 'type' and 'participants' from the request body
    const { type, participants } = req.body;

    // Check if both 'type' and 'participants' are provided
    if (!type || !participants) { // double pipes means 'or'
      throw new Error("Type and participants are required.");  // Throw an error if either is missing
    }

    // Fetch filtered activities based on 'type' and 'participants'
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data;  // Extracting the data from the API response

    // Check if the result is empty and throw an error if no activities match
    if (result.length === 0) {
      throw new Error("No activities that match your criteria.");
    }

    // Render the index.ejs template with a random activity from the filtered results
    res.render("index.ejs", { data: result[Math.floor(Math.random() * result.length)] });
    //'data' is the variable name that EJS uses to access the data
    //'result' is the value element we're sending
    //EJS
  } catch (error) {
    console.error("Failed to fetch filtered activity:", error.message);  // Logging the error if the API request fails

    // Render the index.ejs template with an error message
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

// Start the Express server and listen on the defined port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);  // Log a message indicating that the server is running
});







app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
