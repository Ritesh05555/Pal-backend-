const express = require('express');
const router = express.Router();
const { uploadMedia, getMedia } = require('../controllers/mediaController');
const authMiddleware = require('../middleware/auth');
const { validateMedia, validate } = require('../middleware/validate');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post(
  '/',
  authMiddleware,
  upload.single('file'),
  validateMedia,
  validate,
  uploadMedia
);
router.get('/', authMiddleware, getMedia);

module.exports = router;