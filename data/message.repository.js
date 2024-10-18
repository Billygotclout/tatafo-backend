const Message = require("../models/messages");
const CustomError = require("../utils/CustomError");

exports.get = async (id) => {
  const existingMessage = await Message.findOne({ _id: id });
  if (!existingMessage) {
    throw new CustomError("Message not found", 404);
  }
  return existingMessage;
};
exports.getOne = async (payload) => {
  const existingMessage = await Message.findOne(payload);

  return existingMessage;
};
exports.getByEmail = async (email) => {
  const existingMessage = await Message.findOne({ email: email });

  return existingMessage;
};

exports.getAll = async () => {
  return await Message.find();
};
exports.getCount = async () => {
  return Message.countDocuments({});
};

exports.create = async (payload) => {
  try {
    const newMessage = await Message.create(payload);
    if (!newMessage) {
      throw new CustomError("Error creating Message", 400);
    }
    return newMessage;
  } catch (error) {
    throw error;
  }
};
exports.update = async (id, updatedMessage) => {
  try {
    const updatedMessageDetails = await Message.findOneAndUpdate(
      { _id: id },
      updatedMessage
    );

    return updatedMessageDetails;
  } catch (err) {
    throw err;
  }
};

// A method for deleting one Message instance
exports.deleteOne = async (id) => {
  try {
    await Message.deleteOne({ _id: id });
  } catch (err) {
    throw err;
  }
};
