const errorHandler = (error, _req, res) => {
	res.status(error.status || 500);
	res.json({ message: error.message, success: false });
};

export default errorHandler;
