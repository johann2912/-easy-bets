const express = require('express');

const rouletteRouter = require('./roulette.route');
const userRouter = require('./user.route');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/roulette', rouletteRouter);
    router.use('/user', userRouter);
};

module.exports = routerApi;