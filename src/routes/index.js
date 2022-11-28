const express = require('express');

const rouletteRouter = require('./roulette.route');
const resultRouletteRouter = require('./resultRoulette.route');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/roulette', rouletteRouter);
    router.use('/resultRoulette', resultRouletteRouter);
};

module.exports = routerApi;