// const errorHandler = (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(err.status || 500).json({
//       message: err.message || 'Server error',
//     });
//   };
  
//   module.exports = errorHandler;

///////////////////////////////////////////////////

// const errorHandler = (err, req, res, next) => {
//   console.error('Error Handler:', err.stack);
//   res.status(500).json({ message: 'Internal Server Error', error: err.message });
// };

// module.exports = errorHandler;

const errorHandler = (err, req, res, next) => {
  console.error('Error Handler triggered:', err.stack); // Detailed error log
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
};

module.exports = errorHandler;