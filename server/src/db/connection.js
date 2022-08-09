const { Sequelize } = require("sequelize");
const CONFIG = require("../config/config");

const sequelize = new Sequelize(
    CONFIG.db_mysql.db_mysql_name,
    CONFIG.db_mysql.db_mysql_user,
    CONFIG.db_mysql.db_mysql_pass, {
    dialect: 'mysql',
    host: CONFIG.db_mysql.db_mysql_host,

});

async function connection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { connection, sequelize }