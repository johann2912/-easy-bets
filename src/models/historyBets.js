const { DataTypes } = require("sequelize");
const { db } = require("../database/database");

const HistoryBets = db.define("HistoryBets", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date_bet: { type: DataTypes.DATE, allowNull: false },
    balance_bet: { type: DataTypes.STRING, allowNull: false },
    potential_gain: { type: DataTypes.STRING, allowNull: false },
    quota: { type: DataTypes.FLOAT, allowNull: false },
    number_bet: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false,
});

module.exports = { HistoryBets }