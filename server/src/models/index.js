const UserModel = require("./user_model");
const FriendInviteModel = require('./friend_invites_models')


module.exports = {
  User: UserModel,
  FriendInvite: FriendInviteModel
};
