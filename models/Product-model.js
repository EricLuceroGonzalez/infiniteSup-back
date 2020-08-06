const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  isSupplies: {
    type: Boolean,
    required: true,
    default: false,
  },
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
  flavors: {
    type: Array,
    required: false,
  },
  hasFragance: {
    type: Boolean,
    required: false,
  },
  domesticUse: {
    type: Boolean,
    required: false,
  },
  industryUse: {
    type: Boolean,
    required: false,
  },

  categories: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Category" },
  ],
  creationDate: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
