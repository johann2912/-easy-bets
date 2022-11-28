const { check } = require('express-validator');
const { validationResults } = require('../helper/validatorHelper');

const validateCreateRoulette = [
    check('name')
        .exists()
        .isLength({ min: 3 })
        .notEmpty(),
    check('minimum_bet_balance')
        .exists()
        .isFloat()
        .notEmpty(),
    check('number_min')
        .exists()
        .isInt()
        .notEmpty(),
    check('number_max')
        .exists()
        .isInt()
        .notEmpty(),
    check('quota')
        .exists()
        .isInt()
        .notEmpty(),
    (req, res, next) => {
        validationResults(req, res, next)
    },
];

module.exports = { validateCreateRoulette };