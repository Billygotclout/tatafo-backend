const userService = require("../services/user.service");
const userRepository = require("../data/user.repository");
const CustomError = require("../utils/CustomError");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
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
      data: user,
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
        `http://localhost:5173/changepassword/${forgotPasswordToken}\n\n` +
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
      token: req.params.token,
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

module.exports = { signUpUser, signInUser, forgotPassword, resetPassword };
