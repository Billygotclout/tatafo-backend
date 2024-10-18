const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const messsageRoutes = require("./messages.routes");
const groupRoutes = require("./group.routes");

router.use("/auth", userRoutes);
router.use("/messages", messsageRoutes);
router.use("/group", groupRoutes);

module.exports = router;
