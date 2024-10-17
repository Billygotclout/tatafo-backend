const express = require("express");
const { sendMessage } = require("../controllers/message.controller");
const validateToken = require("../middleware/validateToken");

const router = express.Router();
router.use(validateToken);
router.route("/send-message").post(sendMessage);
module.exports = router;
