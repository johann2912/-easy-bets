const { Roulette } = require('./Roulette');
const { ResultRoulette } = require('./ResultRoulette');
const { User } = require("./User");
const { HistoryBets } = require("./historyBets");

ResultRoulette.belongsTo(Roulette, { 
    foreignKey: "roulette_id",
    targetId: 'id', 
});
Roulette.hasMany(ResultRoulette, { 
    foreignKey: "roulette_id",
    sourceKey: 'id' 
});

HistoryBets.belongsTo(User, { 
    foreignKey: "user_id",
    targetId: 'id'
});
User.hasMany(HistoryBets, { 
    foreignKey: "user_id", 
    sourceKey: 'id'
});

HistoryBets.belongsTo(Roulette, { 
    foreignKey: "roulette_id",
    targetId: 'id',
});
Roulette.hasMany(HistoryBets, { 
    foreignKey: "roulette_id",
    sourceKey: 'id',
});

module.exports = {
    Roulette,
    ResultRoulette,
    User,
    HistoryBets,
}