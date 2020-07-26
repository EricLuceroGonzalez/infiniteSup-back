const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  sizes: {
    type: Array,
    required: false,
  },
  hasFragance: {
    type: Boolean,
    required: false,
  },
  domesticUse: {
    type: Boolean,
    required: true,
  },
  industryUse: {
    type: Boolean,
    required: true,
  },

  category: [{ type: mongoose.Types.ObjectId, ref: "Categories" }],
  creationDate: { type: Date, required: true, default: Date.now },
});

module.exports = Products = mongoose.model("Products", ProductSchema);
