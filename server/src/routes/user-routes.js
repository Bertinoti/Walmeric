const Router = require("express").Router;

const { signup, getCurrentUser, checkUserApi } = require("../controllers/user-controller");

const UserRouter = Router();

UserRouter.post("/signup", signup);
UserRouter.get("/getcurrentuser", getCurrentUser);
UserRouter.post("/checkuserapi", checkUserApi);

module.exports = UserRouter;
