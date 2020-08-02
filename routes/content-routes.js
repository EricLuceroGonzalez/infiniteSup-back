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
const uploadContentControllers = require("../controllers/uploadContent-controller");

// **********************  MIDDLEWARE FUNCTIONS & CONTROLLERS  **********************
router.get("/getBlog", uploadContentControllers.getBlogEntry);
router.get("/getBlog/:id", uploadContentControllers.getBlogEntryId);
router.post(
  "/postBlog",
  [
    check("title").not().isEmpty(),
    check("abstract").not().isEmpty(),
    check("textContent").not().isEmpty(),
  ],
  uploadContentControllers.uploadBlogEntry
);

// router.post("/postProduct", productsControllers.postProduct);

// To connect with principal file:
module.exports = router;
