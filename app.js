// Imports
require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const ejs = require("ejs");

// Fetching the model
const Book = require("./db/book");

// Intialize the app
const app = express();

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Template engine
app.set("view engine", "ejs");

// Loading static files
app.use(express.static("public"));
app.use(express.static("views"));

// Database user ids
var mongo_username = process.env.MONGO_USERNAME;
var mongo_password = process.env.MONGO_PASSWORD;

// MongoDB Atlas Connect
mongoose.connect(
  `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.gwzm7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Homepage rendering
app.get("/", (req, res) => {
  res.render("index");
});

// Add Book Page rendering
app.get("/addbook", (req, res) => {
  res.render("addbook");
});

// Add Book Page Form Data Posting
app.post("/addbook", (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    color: req.body.color,
  });
  book.save();
  res.redirect("/addbook");
  console.log(req.body);
});

// Booklist Page rendering
app.get("/booklist", (req, res) => {
  Book.find({}, (err, book) => {
    res.render("booklist", {
      book: book,
    });
  });
});

// Add Booklist Page Search Query Post
app.post("/booklist", (req, res) => {
  console.log(req.body.booksearch);
  res.redirect("/booklist");
});

// Ports
var PORT = process.env.PORT || 3000;

// Running App on Port
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
