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
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

// Declare variable for storing search book result
var searchbook, searchresult;

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

// Index Page Form Data Posting
app.post("/index", (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    color: req.body.color,
  });
  book.save();
  res.redirect("/");
});

// Add Booklist Page Search Query Post
app.post("/booklist", (req, res) => {
  searchbook = req.body.searchbook;
});

app.get("/booklist", (req, res) => {
  Book.find({}, (err, book) => {
    res.render("booklist", {
      book: book,
    });
    global.book_list = book;
  });
});

app.post("/search", (req, res) => {
  searchbook = req.body.searchbook;
  res.redirect("/search");
});

app.get("/search", (req, res) => {
  // Search database for search query
  Book.aggregate(
    [
      {
        $search: {
          index: "custom",
          text: {
            path: ["title", "author"],
            query: searchbook,
          },
        },
      },
    ],
    (err, s_book) => {
      searchresult = s_book;
      res.render("search", {
        searchresult: searchresult,
        book: book_list,
      });
    }
  );
});

// Ports
var PORT = process.env.PORT || 3000;

// Running App on Port
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
