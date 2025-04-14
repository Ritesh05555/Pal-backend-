// const { check, validationResult } = require('express-validator');

// const validateUser = [
//   check('name').notEmpty().withMessage('Name is required'),
//   check('email').isEmail().withMessage('Valid email is required'),
//   check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
// ];

// const validateContent = [
//   check('type').isIn(['blog', 'story', 'shayari', 'poem']).withMessage('Invalid content type'),
//   check('title').notEmpty().withMessage('Title is required'),
//   check('body').notEmpty().withMessage('Content body is required'),
// ];

// const validateMedia = [
//   check('type').isIn(['image', 'music']).withMessage('Invalid media type'),
// ];

// const validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// module.exports = { validateUser, validateContent, validateMedia, validate };

const { body, validationResult } = require('express-validator');

exports.validateSignup = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.validateContent = [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').notEmpty().withMessage('Body is required'),
  body('type').isIn(['poem', 'blog', 'story', 'shayari']).withMessage('Invalid content type'),
  body('mood').isIn(['happy', 'sad', 'love', 'anxious', 'calm', 'thoughtful']).withMessage('Invalid mood'),
];