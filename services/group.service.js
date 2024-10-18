const Group = require("../models/group");
const GroupMessage = require("../models/groupMessage");
const CustomError = require("../utils/CustomError");
const pusher = require("../utils/pusher");

exports.createGroup = async ({ name, members, creator }) => {
  const group = new Group({
    name,
    members: [creator, ...members],
    creator,
  });

  await group.save();

  return group.populate({
    path: "members",
    model: "User",
  });
};

exports.groupMessage = async ({ groupId, content, senderId }) => {
  const groupMessage = new GroupMessage({
    groupId,
    senderId,
    content,
  });

  await groupMessage.save();

  const group = await Group.findById(groupId).populate("members");
  if (!group) {
    throw new CustomError("Group not found", 404);
  }
  group.members.forEach((member) => {
    if (member._id.toString() !== senderId) {
      pusher.trigger(`group-${groupId}`, "new-message", {
        groupId,
        senderId,
        content,
      });
    }
  });

  return groupMessage;
};
