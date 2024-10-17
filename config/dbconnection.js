const mongoose = require("mongoose");
const logger = require("../utils/logger");
require("dotenv").config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);

    logger.info(
      `Db connected: ${connect.connection.host} ${connect.connection.name}`
    );
  } catch (error) {
    throw error;
  }
};
module.exports = connectDb;
