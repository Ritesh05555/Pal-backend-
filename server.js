
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const connectDB = require('./config/db');

// const app = express();

// // Connect to MongoDB first
// connectDB().then(() => {
//   // Middleware
//   app.use(cors({ origin: 'http://localhost:3001' , credentials: true }));
//   app.use(express.json());
//   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//   // Routes
//   app.use('/api/auth', require('./routes/auth'));
//   app.use('/api/user', require('./routes/user'));
//   app.use('/api/content', require('./routes/content'));
//   app.use('/api/media', require('./routes/media'));

//   // Error Handling
//   app.use(require('./middleware/error'));

//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch(err => {
//   console.error('Failed to connect to MongoDB:', err.message);
//   process.exit(1);
// });

/////////////////////////////////////////////////

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB first
connectDB().then(() => {
  // Middleware
  app.use(cors({ origin: 'https://aapka-pal.onrender.com', credentials: true }));
  app.use(express.json());
  app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploads directory
  app.use(express.static(path.join(__dirname, 'public'))); // Serve public directory at root

  // Routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/user', require('./routes/user'));
  app.use('/api/content', require('./routes/content'));
  app.use('/api/media', require('./routes/media'));

  // Error Handling
  app.use(require('./middleware/error'));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});