const express = require("express");
const app = express();
const cors = require("cors");
var dotenv = require("dotenv");
var bodyParser = require("body-parser");

const productsRoutes = require("../routes/products-routes");
const mailingRoutes = require("../routes/mail-routes");
const contentRoutes = require("../routes/content-routes");
const userRoutes = require("../routes/user-routes");
const HttpError = require("../models/http-error");
dotenv.config();
// const passport = require("passport");
// const users = require("../routes/api/users");

// require("../config/passport")(passport); // Routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // image thingg
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb", extended: true })); // image thingg

app.use(cors());

// app.use(passport.initialize()); // Passport config

// CORS error: set the headers to prevent (Middleware):
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  // ---> Continue flow to other middewares
  next();
});

// ----------------------   CRUD    ----------------------------------------
app.use("/api/products", productsRoutes);
app.use("/api/mailing", mailingRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/user", userRoutes);
// ----------------------   ERRORS    ----------------------------------------
// Error handler when no endpoint or direction is found "NEXT()""
app.use((req, res, next) => {
  const error = new HttpError("No podemos encontrar esta ruta. Verifica.", 404);
  throw error;
});

// Special middleware function - Express knows is Error Handling (4 parameters)
app.use((error, req, res, next) => {
  // Find the file on the request and ERROR ---> Not save
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(`The error on file: ${err}`);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown server error ocurred." });
});

const port = process.env.PORT || 3001;
module.exports = { app, port };
