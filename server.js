const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const connectDb = require("./config/dbconnection");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3001;
const app = express();
const routes = require("./routes/index.routes");
connectDb();

app.use(express.json());
app.use(cors());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api", routes);
app.listen(port, () => {
  logger.info(`Server is listening at http://localhost:${port}`);
});
