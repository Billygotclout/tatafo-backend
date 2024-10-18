const express = require("express");
const {
  sendMessage,
  getAllUsersToChat,
  getConversationHistory,
} = require("../controllers/message.controller");
const validateToken = require("../middleware/validateToken");

const router = express.Router();
router.use(validateToken);
router.route("/send-message").post(sendMessage);
router.route("/get-users").get(getAllUsersToChat);
router.route("/conversation/:senderId/:receiverId").get(getConversationHistory);
module.exports = router;
