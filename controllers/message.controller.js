const messageService = require("../services/messages.service");
const pusher = require("../utils/pusher");

const sendMessage = async (req, res, next) => {
  try {
    const { receiverId, message } = req.body;

    const response = await messageService.toSendMessage({
      userId: req.user.id,
      message: message,
      receiverId: receiverId,
    });
    pusher.trigger(`private-chat-${receiverId}`, "new-message", {
      message,
    });
    res.json({
      message: "Sent!🚀",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage };
