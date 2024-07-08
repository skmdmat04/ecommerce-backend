
const sendResponse = (res, statusCode, success, data, message) => {
    res.status(statusCode).json({
        success,
        data,
        message,
    });
};

const sendSuccess = (res, data, message = 'Request successful') => {
    sendResponse(res, 200, true, data, message);
};

const sendCreated = (res, data, message = 'Resource created successfully') => {
    sendResponse(res, 201, true, data, message);
};

const sendError = (res, statusCode, message) => {
    sendResponse(res, statusCode, false, null, message);
};

module.exports = {
    sendSuccess,
    sendCreated,
    sendError,
};
