const Router = require("express").Router;

const { sendFriendInvite, getFriendInvite } = require("../controllers/friend-invites-controller");

const InviteRouter = Router();

InviteRouter.post("/sendfriendinvite", sendFriendInvite);
InviteRouter.post("/getfriendinvite", getFriendInvite);

module.exports = InviteRouter;
