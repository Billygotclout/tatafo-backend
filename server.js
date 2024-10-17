const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const connectDb = require("./config/dbconnection");
require("dotenv").config();
const port = process.env.PORT || 3001;
const app = express();
const routes = require("./routes/index.routes");
connectDb();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api", routes);
app.listen(port, () => {
  logger.info(`Server is listening at http://localhost:${port}`);
});
