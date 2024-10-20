const { messageService } = require("../services/index.service");
const pusher = require("../utils/pusher");

const sendMessage = async (req, res, next) => {
  try {
    const { receiverId, message } = req.body;

    const response = await messageService.toSendMessage({
      userId: req.user.id,
      message: message,
      receiverId: receiverId,
    });
    // Trigger for both sender and receiver
    await Promise.all([
      pusher.trigger(`chat-${receiverId}`, "new-message", response),
      pusher.trigger(`chat-${req.user.id}`, "new-message", response),
    ]);

    return res.json({
      message: "Sent!🚀",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
const pusherAuth = async (req, res, next) => {
  try {
    const { socket_id, channel_name } = req.body;
    const auth = pusher.authorizeChannel(socket_id, channel_name);
    res.send(auth);
  } catch (error) {
    next(error);
  }
};
const getAllUsersToChat = async (req, res, next) => {
  try {
    const response = await messageService.getUsers(req.user.id);

    return res.json(response);
  } catch (error) {
    next(error);
  }
};
const getConversationHistory = async (req, res, next) => {
  const { senderId, receiverId } = req.params;

  try {
    const response = await messageService.messageHistory({
      senderId: senderId,
      receiverId: receiverId,
    });
    return res.json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  sendMessage,
  getAllUsersToChat,
  getConversationHistory,
  pusherAuth,
};
