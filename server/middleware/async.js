const asyncWrapper = (callback) => {
	// return async function right away
	return async (req, res, next) => {
		try {
			await callback(req, res, next);
		} catch (error) {
			// pass to the built in express next error middleware
			next(error);
		}
	};
};

module.exports = asyncWrapper;
