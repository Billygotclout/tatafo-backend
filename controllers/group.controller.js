const { groupService } = require("../services/index.service");

const createGroupChat = async (req, res, next) => {
  try {
    const { name, members } = req.body;
    const creator = req.user.id;
    const response = await groupService.createGroup({
      creator: creator,
      members: members,
      name: name,
    });

    return res.json({
      message: "Your Amebo Space has been created!🤩🚀",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
const sendGroupMessage = async (req, res, next) => {
  try {
    const { groupId, content } = req.body;
    const senderId = req.user.id;
    const response = await groupService.groupMessage({
      content: content,
      senderId: senderId,
      groupId: groupId,
    });

    res.json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = { createGroupChat, sendGroupMessage };
