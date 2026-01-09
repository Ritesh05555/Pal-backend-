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