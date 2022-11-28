const { DataTypes } = require("sequelize");
const { db } = require("../database/database");

const ResultRoulette = db.define("ResultRoulette", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    result: { type: DataTypes.INTEGER, allowNull: false },
    result_date: { type: DataTypes.DATE, allowNull: false },
}, {
    timestamps: false,
});

module.exports = { ResultRoulette }