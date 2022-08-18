const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const User = sequelize.define('Users', {
    uid: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    friendInvites: {
        type: DataTypes.INTEGER(11),
    }
}, {});
sequelize.sync()
    .then(()=> console.log('Database User create successfully'))
    .catch((error) => console.log(error))

module.exports = User