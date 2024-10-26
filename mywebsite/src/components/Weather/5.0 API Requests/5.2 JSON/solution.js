import express from "express"; // Import the Express library for handling HTTP requests and responses.
import bodyParser from "body-parser"; // Import the body-parser middleware for parsing request bodies.

const app = express(); // Create an instance of an Express application.
const port = 3000; // Define the port number on which the server will listen.

const recipeJSON = // Define a JSON string containing an array of recipe objects.
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

app.use(express.static("public")); // Serve static files from the 'public' directory (e.g., CSS, JavaScript, images).
app.use(bodyParser.urlencoded({ extended: true })); // Configure body-parser to parse URL-encoded bodies (like form submissions).

let data; // Define a variable 'data' to hold the selected recipe data.

app.get("/", (req, res) => { // Define a route handler for GET requests to the root URL.
  res.render("solution.ejs", { recipe: data }); // Render the 'solution.ejs' view template and pass 'data' as the 'recipe' variable.
});

app.post("/recipe", (req, res) => { // Define a route handler for POST requests to the '/recipe' URL.
  switch (req.body.choice) { // Check the value of 'choice' from the submitted form data.
    case "chicken":
      data = JSON.parse(recipeJSON)[0]; // Set 'data' to the first recipe in the JSON array if 'choice' is 'chicken'.
      break;
    case "beef":
      data = JSON.parse(recipeJSON)[1]; // Set 'data' to the second recipe in the JSON array if 'choice' is 'beef'.
      break;
    case "fish":
      data = JSON.parse(recipeJSON)[2]; // Set 'data' to the third recipe in the JSON array if 'choice' is 'fish'.
      break;
    default:
      break; // Handle any other 'choice' values (does nothing in this case).
  }
  res.redirect("/"); // Redirect the user to the root URL after processing the form submission.
});

app.listen(port, () => { // Start the Express server on the specified port and log a message when it is running.
  console.log(`Server running on port: ${port}`); // Log the server port to the console.
});

