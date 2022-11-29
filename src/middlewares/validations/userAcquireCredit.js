const { check } = require('express-validator');
const { validationResults } = require('../helper/validatorHelper');

const validateUserAcquireCredit = [
    check('balance')
        .isInt()
        .notEmpty(),
    (req, res, next) => {
        validationResults(req, res, next)
    },
];

module.exports = { validateUserAcquireCredit };