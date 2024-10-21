const CustomError = require("../utils/CustomError");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const User = require("../models/user");
const { userService } = require("../services/index.service");
const { userRepository } = require("../data");
const signUpUser = async (req, res, next) => {
  try {
    const response = await userService.register({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      message: "Sign Up Successful🚀",
      user: response,
    });
  } catch (error) {
    next(error);
  }
};
const signInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.login({
      email: email,
      password: password,
    });

    const token = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.TOKEN_SECRET
    );

    return res.json({
      message: "Sign In Successful🚀",
      token: token,
      user: user,
    });
  } catch (error) {
    next(error);
    logger.error(error.message);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
    const user = await userRepository.getByEmail(req.body.email);
    const forgotPasswordToken = await userService.passwordRecovery({
      email: req.body.email,
    });
    await sendMail({
      email: req.body.email,
      subject: "Password Reset",
      text:
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://localhost:5173/reset-password?token=${forgotPasswordToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });

    return res.json({
      message:
        "Success! Please check your email for our password recovery email 🚀",
    });
  } catch (error) {
    next(error);
    logger.error(error.message);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const user = await userRepository.getByEmail(req.body.email);
    await userService.passwordChange({
      token: req.body.token,
      password: req.body.password,
    });

    return res.json({
      message: "Password successfully reset🚀",
    });
  } catch (error) {
    next(error);
    logger.error(error.message);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return res.json({
      message: "Here you are!🚀",
      user: user,
    });
  } catch (error) {
    next(error);
    logger.error(error.message);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  currentUser,
  signUpUser,
  signInUser,
  forgotPassword,
  resetPassword,
  getUserById,
};
