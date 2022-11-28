const { Sequelize } = require('sequelize');
const config   = require('../config/config');

const db = new Sequelize(
    config.database.db, 
    config.database.user, 
    config.database.password, 
    {
        host: config.database.host,
        dialect: 'mysql',
        logging: false,
    }
);

module.exports = { db };