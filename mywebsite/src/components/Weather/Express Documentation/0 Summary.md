1. Setting Up an Express App for APIs
# Installation: 
First, install Express using npm install express.
`Creating an App`: Set up your Express app by requiring Express and initializing it:

const express = require('express');
const app = express();

`Defining Routes`: Use app.get(), app.post(), etc., to define routes for different HTTP methods. For example:

app.get('/api/resource', (req, res) => {
  res.send('GET request for resource');
});

2. Middleware
Purpose: Middleware functions handle requests before they reach route handlers and can modify the request and response objects.
Using Middleware: To use middleware globally for all routes, you can apply it like this:

app.use(express.json());  // For parsing JSON bodies
`Third-Party Middleware`: Commonly used third-party middleware for APIs includes body-parser (although it is now part of Express as express.json()) and morgan for logging.

3. Routing in APIs
Route Parameters: Express allows defining routes with parameters using ::

app.get('/api/resource/:id', (req, res) => {
  res.send(`Resource ID: ${req.params.id}`);
});
`Query Parameters`: Use req.query to access query string parameters:

app.get('/api/resource', (req, res) => {
  const query = req.query;
  res.send(query);
});

4. Handling HTTP Methods
GET: Use app.get() to handle GET requests (for fetching data).
POST: Use app.post() to handle POST requests (for creating resources).
PUT: Use app.put() to handle PUT requests (for updating resources).
DELETE: Use app.delete() to handle DELETE requests (for deleting resources).

5. Sending Responses
`Basic Responses`: Use res.send() to send back a string or JSON response.

res.send('Hello World');
res.json({ message: 'Data received' });

`Setting Status Codes`: You can set HTTP status codes like this:

res.status(200).send('Success');
res.status(404).send('Not Found');

6. Error Handling
`Custom Error Middleware`: To handle errors in an API, you can define custom error-handling middleware:

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

7. Routing with Express Router
`Creating a Router`: For more complex APIs, Express allows modularizing routes using express.Router():

const router = express.Router();
router.get('/resource', (req, res) => {
  res.send('Resource list');
});
app.use('/api', router);
