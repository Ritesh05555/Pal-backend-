const errorHandler = (err, req, res, next) => {
  console.error('Error Handler triggered:', err.stack); // Detailed error log
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
};

module.exports = errorHandler;