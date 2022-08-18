const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const FriendInvite = sequelize.define('FriendInvites', {
    inviteId: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true,
    },
    userSender: {
        type: DataTypes.STRING
    },
    userRecever: {
        type: DataTypes.STRING
    },
    inviteDate: {
        type: DataTypes.DATE
    },
});

sequelize.sync()
    .then(() => console.log('Database Friends Invite create successfully'))
    .catch((error) => console.log(error))

module.exports = FriendInvite