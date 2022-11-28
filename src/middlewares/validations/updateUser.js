const { check } = require('express-validator');
const { validationResults } = require('../helper/validatorHelper');

const validateUpdateUser = [
    check('nick_name')
        .isLength({ min: 3 })
        .notEmpty()
        .optional(),
    check('document_type')
        .notEmpty()
        .isIn(['CC', 'CE', 'NIP', 'NES'])
        .optional(),
    check('document_number')
        .isString({ min: 5 })
        .notEmpty()
        .optional(),
    check('email')
        .isEmail()
        .notEmpty()
        .optional(),
    check('user_type')
        .isInt()
        .notEmpty()
        .optional(),
    (req, res, next) => {
        validationResults(req, res, next)
    },
];

module.exports = { validateUpdateUser };