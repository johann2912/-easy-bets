const typesError = require('../../errors/types');
const errors = require('../../errors/index');

const statusCodes = {
    [typesError.NOT_FOUND]: 404,
    [typesError.BAD_REQUEST]: 400,
    [typesError.FORMAT_ERROR]: 400,
    [typesError.DEFAULT_ERROR]: 500,
};

const handle = (error, req, res, next) => {
    res.status(
        statusCodes[error.internalCode] || statusCodes[typesError.DEFAULT_ERROR],
    );
    if(res.statusCodes >= 500) {
        next(error);
    };
    return res.send({
        internal_code: error.internalCode,
        message: error.message,
    })
};

const notFoundResource = (req, res, next) => {
    res
        .status(404)
        .send(
            errors.functions.generateStandard(
                errors.types.NOT_FOUND,
                errors.messages.common.notFoundResource,
            ),
        );
};

module.exports = {
    handle,
    notFoundResource,
};