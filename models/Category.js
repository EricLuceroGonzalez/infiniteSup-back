const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  fgLogo: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
});

module.exports = Categories = mongoose.model("Categories", CategorySchema);
