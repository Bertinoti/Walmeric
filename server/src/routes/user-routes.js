const Router = require("express").Router;

const { signup, getCurrentUser } = require("../controllers/user-controller");

const UserRouter = Router();

UserRouter.post("/signup", signup);
UserRouter.post("/getcurrentuser", getCurrentUser);

module.exports = UserRouter;
