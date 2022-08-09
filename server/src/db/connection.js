const { Sequelize } = require("sequelize");
const CONFIG = require("../config/config");

async function connection() {
    try {
        const sequelize = new Sequelize(
            'pruebawalmeric',
            'root',
            '', {
            host: 'localhost',
            dialect: 'mysql'
        });
        // await mongoose.connect(CONFIG.mongoDB.mongoDB_URL)
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connection