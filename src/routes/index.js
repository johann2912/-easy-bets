const express = require('express');

const rouletteRouter = require('./roulette.route');
const resultRouletteRouter = require('./resultRoulette.route');
const userRouter = require('./user.route');
const historyBetsRouter = require('./historyBets.route');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/roulette', rouletteRouter);
    router.use('/resultRoulette', resultRouletteRouter);
    router.use('/user', userRouter);
    router.use('/history_bets', historyBetsRouter);
};

module.exports = routerApi;