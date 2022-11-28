const  dotenv = require('dotenv');
dotenv.config();

const config = {
    project: { 
        port: process.env.PORT
    },
    database: {
        host: process.env.DB_HOST,
        db: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
};

module.exports = config;