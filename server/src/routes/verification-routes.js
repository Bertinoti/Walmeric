const Router = require("express").Router;

const { checkUserApi } = require("../controllers/user-controller");

const VerifyRouter = Router();

VerifyRouter.post("/checkuserapi", checkUserApi);

module.exports = VerifyRouter;
