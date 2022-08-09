const Router = require("express").Router;

const { signup, checkPayment } = require("../controllers/user-controller");

const UserRouter = Router();

UserRouter.post("/signup", signup);
UserRouter.post("/checkPayment", checkPayment);

module.exports = UserRouter;
