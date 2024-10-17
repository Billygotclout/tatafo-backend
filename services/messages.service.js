const Message = require("../models/messages");

exports.toSendMessage = async ({ receiverId, message, userId }) => {
  try {
    const newMessage = new Message({
      senderId: userId,
      receiverId: receiverId,
      message: message,
    });

    await newMessage.save();

    return newMessage.populate({
      path: "senderId receiverId",
      model: "User",
    });
  } catch (error) {
    throw error;
  }
};
