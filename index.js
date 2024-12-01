const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const router = require("./api/v1/router/index.router");
database.connect();
const app = express();
const port = process.env.PORT;
router(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
