import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    res.render("solution.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    //the below three (really, 2, minus the console log) lines represent our 'request', which is the data we'll be sending over
    console.log(req.body); //simply console logging the request.body (the body of the EJS file)
    const type = req.body.type; //the type is a data point, part of our (type, participants) that we'll display
    const participants = req.body.participants; //and, participants

    //the following lines represent the response, which is what we expect to receive after we send the data above
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data; //rhe result variable is simply the data of the response
    console.log(result); //and console logging it just to show what it looks like
    res.render("solution.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    }); //now rendering the data on the screen. the view is the solution.ejs file (which is just the html, really)
    //the data key is called data, and the value of it will be a random result
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
