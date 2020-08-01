const express = require("express");
// Import the express-validator:
const { check } = require("express-validator");

app = express();
// Special object to middleware (and export)
const router = express.Router();

// Call the controllers
const mailingControllers = require("../controllers/mailing-controllers");

// **********************  MIDDLEWARE FUNCTIONS & CONTROLLERS  **********************
router.post(
  "/send",
  [check("email").not().isEmpty(), check("message").not().isEmpty()],
  mailingControllers.sendMail
);
// router.get("/user/:uid", mailingControllers.getPlacesByUserId);

// **********************  MIDDLEWARE To ACCESS next requests  **********************
// router.use(checkAuth);

// router.post(
//   "/postCategory",
//   [check("categoryName").not().isEmpty(), check("logo").not().isEmpty()],
//   mailingControllers.postCategory
// );

// router.post("/postProduct", mailingControllers.postProduct);

// To connect with principal file:
module.exports = router;
