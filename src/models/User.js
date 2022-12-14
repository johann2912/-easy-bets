const { DataTypes } = require("sequelize");
const { db } = require("../database/database");

const User = db.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nick_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    document_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    document_type: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    user_type: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false,
});

module.exports = { User }