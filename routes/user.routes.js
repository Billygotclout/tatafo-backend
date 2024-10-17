const express = require("express");
const {
  signUpUser,
  signInUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controller");

const router = express.Router();
router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
module.exports = router;
