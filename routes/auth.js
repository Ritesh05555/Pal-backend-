
// const express = require('express');
// const router = express.Router();
// const { signup, login } = require('../controllers/authController');
// const { validateUser, validate } = require('../middleware/validate');
// const { check } = require('express-validator'); // Add this import

// // Validation for login (only email and password)
// const validateLogin = [
//   check('email').isEmail().withMessage('Valid email is required'),
//   check('password').notEmpty().withMessage('Password is required'),
// ];

// router.post('/signup', validateUser, validate, signup);
// router.post('/login', validateLogin, validate, login);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const upload = require('../middleware/upload');
// const auth = require('../middleware/auth');

// router.post('/login', authController.login);
// router.post('/signup', upload.single('profilePic'), authController.signup);
// router.get('/profile', auth, authController.getProfile);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/signup', upload.single('profilePic'), authController.signup);
router.get('/profile', auth, authController.getProfile);

module.exports = router;