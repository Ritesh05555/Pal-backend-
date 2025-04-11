const { check, validationResult } = require('express-validator');

const validateUser = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const validateContent = [
  check('type').isIn(['blog', 'story', 'shayari', 'poem']).withMessage('Invalid content type'),
  check('title').notEmpty().withMessage('Title is required'),
  check('body').notEmpty().withMessage('Content body is required'),
];

const validateMedia = [
  check('type').isIn(['image', 'music']).withMessage('Invalid media type'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateUser, validateContent, validateMedia, validate };