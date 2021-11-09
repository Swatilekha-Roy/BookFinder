const mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  date: {
    type: String,
  },
  color: {
    type: String,
  },
});

module.exports = mongoose.model("Post", bookSchema);
