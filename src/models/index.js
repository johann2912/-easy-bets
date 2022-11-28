const { Roulette } = require('./Roulette');
const { ResultRoulette } = require('./ResultRoulette');

Roulette.belongsTo(ResultRoulette, { foreignKey: "id" });
ResultRoulette.hasMany(Roulette, { foreignKey: "id" });


module.exports = {
    Roulette,
    ResultRoulette,
}