const  { validationResult } = require('express-validator');

const validationResults = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next();
    } catch (error) {
        res.send({ errors: error })
    }
};

module.exports = {
    validationResults,
}