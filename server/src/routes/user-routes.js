const Router = require("express").Router;

const { signup, getCurrentUser } = require("../controllers/user-controller");

const UserRouter = Router();

UserRouter.post("/signup", signup);
UserRouter.get("/getcurrentuser", getCurrentUser);

module.exports = UserRouter;
