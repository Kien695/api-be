const taskRouter = require("./task.router");
const userRouter = require("./user.router");
const authMiddleware = require("../middlewares/auth.middleware");
module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/task", authMiddleware.requireAuth, taskRouter);
  app.use(version + "/users", userRouter);
};
