const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const User = sequelize.define('User', {
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {});
sequelize.sync()
    .then(()=> console.log('Database create successfully'))
    .catch((error) => console.log(error))

module.exports = User