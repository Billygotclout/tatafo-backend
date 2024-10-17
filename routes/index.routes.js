const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const messsageRoutes = require("./messages.routes");

router.use("/auth", userRoutes);
router.use("/messages", messsageRoutes);

module.exports = router;
