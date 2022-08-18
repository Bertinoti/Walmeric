const { Op } = require("sequelize");
const { User, FriendInvite } = require("../models");
const { sendError } = require("../response");

async function sendFriendInvite(req, res, next) {
    try {
        const { friendPhone, frienduid, friendEmail, userEmail } = req.body;

        const user = await User.findOne({
            where: { email: userEmail }
        });
        const friend = await User.findAll({
            where: {
                [Op.or]: [
                    { uid: frienduid },
                    { email: friendEmail },
                    { phone: friendPhone }
                ]
            }
        });
        if (friend.length <= 0) {
            res.status(202).json(sendError("User Not Found"))
        } else {
            const invite = await FriendInvite.create({
                userSender: user.uid,
                userRecever: friend[0].uid,
            })

            res.status(201).send({
                data: { invite }
            });
        }
    } catch (error) {
        console.log("SendFriendInvite", error)
        sendError("SendFriendInvite", error)
    }
}

async function getFriendInvite(req, res, next) {
    try {
        const { userUid } = req.body;
        const invite = await FriendInvite.findOne({
            where: {[Op.or]: [
                {userRecever: userUid },
                {userSender: userUid }
            ]
            }
        });
        if (!invite) {
            return res.status(202).json(sendError("You dont have pending invites"));
        } else {
            res.status(200).send({ data: invite });
            next(res);
        }
    } catch (error) {
        console.log("Error", error);
        sendError("getFriendInvite", error)
    }
}

module.exports = {
    sendFriendInvite,
    getFriendInvite
}