const { check } = require('express-validator');
const { validationResults } = require('../helper/validatorHelper');

const validateCreateUser = [
    check('nick_name')
        .exists()
        .isLength({ min: 3 })
        .notEmpty(),
    check('document_type')
        .exists()
        .notEmpty()
        .isIn(['CC', 'CE', 'NIP', 'NES']),
    check('document_number')
        .exists()
        .isString({ min: 5 })
        .notEmpty(),
    check('email')
        .exists()
        .isEmail()
        .notEmpty(),
    check('password')
        .exists()
        .isString({ min: 5 })
        .notEmpty(),
    check('user_type')
        .exists()
        .isInt()
        .notEmpty(),
    (req, res, next) => {
        validationResults(req, res, next)
    },
];

module.exports = { validateCreateUser };