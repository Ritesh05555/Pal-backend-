const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/signup', upload.single('profilePic'), authController.signup);
router.get('/profile', auth, authController.getProfile);

module.exports = router;