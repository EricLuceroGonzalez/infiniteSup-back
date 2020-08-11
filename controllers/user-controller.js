// Get the validator RESULTS:
const { validationResult } = require("express-validator");

// Encrypt libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CAll the Error Model (our own model)
const HttpError = require("../models/http-error");

// Get the user schema:
const User = require("../models/User-model");

const signup = async (req, res, next) => {
  // Call validation RESULT before, to check validity
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Los valores introducidos no son validos. Intenta de nuevo",
      422
    );
    return next(error);
  }

  const { name, email, password } = req.body;

  //   Check if he user already exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Some error just happen checking the email",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "User already exists, please login instead",
      422
    );
    return next(error);
  }

  // With bycrpt we HASH the password from incoming request:
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword, // Store the hashed password
  });
  // console.log(`createdUser: ${createdUser}`);

  //   Create USER ---> save() to Mongo, as async => await
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again", 500);
    return next(error);
  }

  // generate TOKEN
  // console.log(`process.env.JWT_KEY:`);
  // console.log(process.env.JWT_KEY);
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) { 
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  // FIND IF HE USER ALREADY EXISTS
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "No pudimos verificar el correo. Por favor intenta de nuevo.",
      500
    );
    return next(error);
  }

  //   CHECK IF EMAIL IS CORRECT (dummy version)
  if (!existingUser) {
    const error = new HttpError(
      "Este usuario no ha sido encontrado, crea una cuenta nueva.",
      403
    );
    return next(error);
  }

  console.log((`name: ${email}`));
  console.log(password);
  
  
  // Check the password, compare to the encrypted and give a token
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "No podemos verificar tus credenciales. Verifica!",
      500
    );
    return next(error);
  }

  // Check id !isValidPassword
  if (!isValidPassword) {
    const error = new HttpError(
      "Este usuario no ha sido encontrado, crea una cuenta nueva.",
      403
    );
    return next(error);
  }

  // generate TOKEN
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "El proceso ha fallado, intentalo de nuevo.",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

//
const getUsers = async (req, res, next) => {
  // FIND and retrieve only USERNAME and PASSWORD
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
