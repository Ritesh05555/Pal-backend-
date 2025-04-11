const express = require('express');
const router = express.Router();
const {
  createContent,
  getContent,
  updateContent,
  deleteContent,
  likeContent,
} = require('../controllers/contentController');
const authMiddleware = require('../middleware/auth');
const { validateContent, validate } = require('../middleware/validate');

router.post('/', authMiddleware, validateContent, validate, createContent);
router.get('/', getContent);
router.put('/:id', authMiddleware, validateContent, validate, updateContent);
router.delete('/:id', authMiddleware, deleteContent);
router.post('/:id/like', authMiddleware, likeContent);

module.exports = router;