const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("blogEntry", BlogEntrySchema);
