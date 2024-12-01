const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const database = require("./config/database");
const router = require("./api/v1/router/index.router");
database.connect();
const app = express();
const port = process.env.PORT;
// parse application/json
app.use(bodyParser.json());

router(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
