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
    required: false,
  },
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: "Product" }],
});

module.exports = mongoose.model("Category", CategorySchema);
