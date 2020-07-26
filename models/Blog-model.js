const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  textContent: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  visitsNumber: { type: Number, required: true, default: 0 },
  creationDate: { type: Date, required: true, default: Date.now },
});

module.exports = Blog = mongoose.model("Blog", BlogSchema);
