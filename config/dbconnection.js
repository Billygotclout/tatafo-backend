const mongoose = require("mongoose");
const logger = require("../utils/logger");
require("dotenv").config();

const connectDb = async (next) => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);

    logger.info(
      `Db connected: ${connect.connection.host} ${connect.connection.name}`
    );
  } catch (error) {
    next(error);
  }
};
module.exports = connectDb;
