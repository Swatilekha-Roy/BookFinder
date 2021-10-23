// Imports
require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const ejs = require("ejs");

// Intialize the app
const app = express();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

// Template engine
app.set("view engine", "ejs");

// For parsing application/json
app.use(bodyParser.json());

// Loading static files
app.use(express.static("public"));
app.use(express.static("views"));

// Homepage rendering
app.get("/", function (req, res) {
  res.render("index", { currentUser: req.user });
});

// Ports
var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
