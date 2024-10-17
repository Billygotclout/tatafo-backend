const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("../models/user");
const logger = require("../utils/logger");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("Connected to Mongodb.........."))
  .catch((err) => logger.error(err));
const plaintextPassword = "password";
const generateUsers = async (num) => {
  const users = [];
  const hashedPassword = await bcrypt.hash(plaintextPassword, 10);
  for (let i = 0; i < num; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const username = faker.internet.userName(firstname, lastname);
    const email = faker.internet.email(firstname, lastname);

    users.push({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword, // Use the same hashed password for all users
    });
  }

  return users;
};
const seedDB = async () => {
  try {
    // Clear existing users
    const users = await generateUsers(10); // Generate 10 random users
    await User.insertMany(users); // Insert the generated users
    logger.info("Database seeded with Faker data!");
    mongoose.connection.close(); // Close the database connection
  } catch (error) {
    logger.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

// Run seed function
seedDB();
