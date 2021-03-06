// Dependencies
const express = require("express");
const bodyParser = require("body-parser"); //JSON responses
const mongoose = require("mongoose"); //Mongo object modelling 
//Place these after you load the mongoose package into you variable mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Require all models
const db = require("./models");

// Port configuration for local/Heroku
const PORT = process.env.PORT || process.argv[2] || 8080;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// Controllers
const router = require("./controllers/api.js");
app.use(router);
// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

// Start the server
app.listen(PORT, function () {
    console.log(`This application is running on port: ${PORT}`);
});