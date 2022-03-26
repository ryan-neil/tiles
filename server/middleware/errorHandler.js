const { CustomAPIError } = require('../errors/error');

const errorHandlerMiddleware = (err, req, res, next) => {
	// if the error is the instance of our custom error
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}
	return res.status(500).json({ msg: 'Something went wrong, please try again' });
};

module.exports = errorHandlerMiddleware;
