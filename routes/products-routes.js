const express = require("express");

// Fileulpoad Middleware
// const fileUpload = require("../middleware/file-upload");
// Auth-check Middleware
// const checkAuth = require("../middleware/check-auth");

// Import the express-validator:
const { check } = require("express-validator");

app = express();
// Special object to middleware (and export)
const router = express.Router();

// Call the controllers
const productsControllers = require("../controllers/products-controllers");

// **********************  MIDDLEWARE FUNCTIONS & CONTROLLERS  **********************
router.get("/getCategories", productsControllers.getCategories);
router.get("/getProducts", productsControllers.getProducts);
// router.get("/user/:uid", productsControllers.getPlacesByUserId);

// **********************  MIDDLEWARE To ACCESS next requests  **********************
// router.use(checkAuth);

router.post(
  "/postCategory",
  [check("categoryName").not().isEmpty(), check("logo").not().isEmpty()],
  productsControllers.postCategory
);

router.post("/postProduct", productsControllers.postProduct);

// To connect with principal file:
module.exports = router;
