const userRepository = require("../data/user.repository");
const User = require("../models/user");
const CustomError = require("../utils/CustomError");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
exports.register = async ({
  firstname,
  lastname,
  email,
  username,
  password,
}) => {
  const user = await userRepository.getByEmail(email);

  if (user) {
    throw new CustomError("User already exists, please login", 400);
  }

  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
  });
  const hashedPassword = await bcrypt.hash(password, 10);

  newUser.password = hashedPassword;
  await newUser.save();

  return newUser;
};

exports.login = async ({ email, password }) => {
  const user = await userRepository.getByEmail(email);
  const correctLogin =
    user.email && (await bcrypt.compare(password, user.password));
  if (!correctLogin) {
    throw new CustomError("Invalid Username or Password", 400);
  }
  return user;
};

exports.passwordRecovery = async ({ email }) => {
  const user = await userRepository.getByEmail(email);
  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3780000;
  await user.save();
  return token;
};
exports.passwordChange = async ({ token, password }) => {
  try {
    const user = await userRepository.getOne({
      resetPasswordToken: token,
    });

    if (!user) {
      throw new CustomError("Password reset token is invalid/Expired", 400);
    }

    if (user.resetPasswordExpires < Date.now() + 3600000) {
      throw new CustomError("Password reset token has expired", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return "Password changed successfully";
  } catch (error) {
    throw error;
  }
};
