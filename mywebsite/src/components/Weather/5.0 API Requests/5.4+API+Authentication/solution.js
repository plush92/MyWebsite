import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// TODO: Replace the values below with your own before running this file.
const yourUsername = "";
const yourPassword = "";
const yourAPIKey = "";
const yourBearerToken = "";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." }); //when you first load up the site (with no endpoint) it displays "API Response" in the box
});

app.get("/noAuth", async (req, res) => { //an 'async' will always be followed by an 'await' somewhere. the 'async' will fulfill a 'promise'
  try {
    const result = await axios.get(API_URL + "/random"); //the 'await' pauses the execution of this until the 'async' is fulfilled. we can't generate the data unless the previous stuff has already happeend
    //the above code is using the 'get' built in method via AXIOS to get the data from the '/random' endpoint. Remember, the website is already set up to generate data, with no authentication needed, via the '/random' endpoint
    res.render("index.ejs", { content: JSON.stringify(result.data) }); //after this, the site will render the data via the 'res.render' method (response.render)
    //the parameters of the 'res.render' function begin with the 'view'. in this case, the index.ejs file.
    //the second parameter (called 'locals') is an object which contains the data that's to be passed to the view.
      //in this case, 'content' is the name of the variable that we're calling our data. 
      //we can call it 'data' if we want, but that would require us to also change the ejs file (towards the bottom, where it says <%=content%>)
      //the value is the actual data retrieved when we call the /random endpoint, which we've put in the 'result' variable right above this.
        //we use the method JSON.stringify for formatting reasons. this way it displays the data in a JSON formatted string
        //the method is used on the 'result.data'. Again, the '.data' is actually an AXIOS built in method that returns the data received from this /random endpoint.
          //if we didn't use .data, the 'result' variable would simply contain the entire website, including any HTML, CSS, etc.
    //you should review Javascript syntax on w3 schools tomorrow!
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
