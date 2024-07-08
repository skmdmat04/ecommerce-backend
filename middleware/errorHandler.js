const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    console.error("err.stack", err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    sendError(res, statusCode, message);
};

module.exports = errorHandler;
