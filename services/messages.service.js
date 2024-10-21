const { messageRepository, userRepository } = require("../data");
const Message = require("../models/messages");
const User = require("../models/user");

exports.toSendMessage = async ({ receiverId, message, userId }) => {
  try {
    const newMessage = new Message({
      senderId: userId,
      receiverId: receiverId,
      message: message,
    });

    await newMessage.save();

    return newMessage;
  } catch (error) {
    throw error;
  }
};
exports.getUsers = async (userId) => {
  const users = await User.find(
    { _id: { $ne: userId } },
    "firstname lastname username email"
  );
  return users;
};
exports.messageHistory = async ({ senderId, receiverId }) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    return messages;
  } catch (error) {
    throw error;
  }
};
