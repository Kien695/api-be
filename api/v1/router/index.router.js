const taskRouter = require("./task.router");
const userRouter = require("./user.router");

module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/task", taskRouter);
  app.use(version + "/users", userRouter);
};
