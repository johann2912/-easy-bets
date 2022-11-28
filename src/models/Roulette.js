const { DataTypes } = require("sequelize");
const { db } = require("../database/database");

const Roulette = db.define("Roulette", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: DataTypes.STRING(500), allowNull: false, unique: true },
    minimum_bet_balance: { type: DataTypes.STRING(500), allowNull: false },
    number_min: { type: DataTypes.INTEGER, allowNull: false },
    number_max: { type: DataTypes.INTEGER, allowNull: false },
    quota: { type: DataTypes.FLOAT, allowNull: false },
}, {
    timestamps: false,
});

module.exports = { Roulette }