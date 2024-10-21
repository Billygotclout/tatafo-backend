const express = require("express");
const {
  sendMessage,
  getAllUsersToChat,
  getConversationHistory,
  pusherAuth,
} = require("../controllers/message.controller");
const validateToken = require("../middleware/validateToken");

const router = express.Router();
router.use(validateToken);
router.route("/send-message").post(sendMessage);
router.route("/get-users").get(getAllUsersToChat);
router.route("/pusher/auth").post(pusherAuth);
router.route("/conversation/:senderId/:receiverId").get(getConversationHistory);
module.exports = router;
