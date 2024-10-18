const express = require("express");

const validateToken = require("../middleware/validateToken");
const {
  createGroupChat,
  sendGroupMessage,
} = require("../controllers/group.controller");

const router = express.Router();
router.use(validateToken);
router.route("/create").post(createGroupChat);
router.route("/send-message").post(sendGroupMessage);
module.exports = router;
