const { check } = require('express-validator');
const { validationResults } = require('../helper/validatorHelper');

const validateUserBettigCredits = [
    check('number_bet')
        .notEmpty()
        .isInt(),
    check('balance_bet')
        .notEmpty()
        .isInt(),
    (req, res, next) => {
        validationResults(req, res, next)
    },
];

module.exports = { validateUserBettigCredits };