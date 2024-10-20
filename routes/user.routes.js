const express = require("express");
const {
  signUpUser,
  signInUser,
  forgotPassword,
  resetPassword,
  currentUser,
} = require("../controllers/user.controller");
const validateToken = require("../middleware/validateToken");

const router = express.Router();
router.route("/current-user").get(validateToken, currentUser);

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
module.exports = router;
