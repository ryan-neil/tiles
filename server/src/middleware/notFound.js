const notFound = (req, res) => {
	res.status(404);
	res.send('Route does not exist');
};

module.exports = notFound;
