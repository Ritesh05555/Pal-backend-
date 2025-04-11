// const express = require('express');
// const router = express.Router();
// const { signup, login } = require('../controllers/authController');
// const { validateUser, validate } = require('../middleware/validate');

// router.post('/signup', validateUser, validate, signup);
// router.post('/login', validateUser, validate, login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { validateUser, validate } = require('../middleware/validate');
const { check } = require('express-validator'); // Add this import

// Validation for login (only email and password)
const validateLogin = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').notEmpty().withMessage('Password is required'),
];

router.post('/signup', validateUser, validate, signup);
router.post('/login', validateLogin, validate, login);

module.exports = router;