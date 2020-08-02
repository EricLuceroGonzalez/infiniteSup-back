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
  image: {
    type: String,
    required: true,
  },
  creationDate: { type: Date, required: true, default: Date.now },
  // features: {
  //   type: Array,
  //   required: false,
  // },
  // visitsNumber: { type: Number, required: true, default: 0 },
});

module.exports = Blog = mongoose.model("Blog", BlogSchema);
