const express = require("express");
const taskRouter = require("./task.router");
module.exports = (app) => {
  app.use("/api/v1/task", taskRouter);
};
