const mongoose = require("mongoose");
// Unique validator:
// const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

// Create the Schema:
const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, minlength: 6 },
});

// Exports the model
module.exports = mongoose.model("User", userSchema);
