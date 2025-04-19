// const express = require('express');
// const router = express.Router();
// const { getProfile, updateProfile } = require('../controllers/userController');
// const authMiddleware = require('../middleware/auth');

// router.get('/profile', authMiddleware, getProfile);
// router.put('/profile', authMiddleware, updateProfile);

// module.exports = router;


///////////////////////////////////////////////
// ori
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController'); // Ensure this path is correct
// const auth = require('../middleware/auth');

// router.get('/profile', auth, authController.getProfile);

// module.exports = router;

////////////////////////////////////////////
// ori cloud
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController'); // Ensure this path is correct
// const auth = require('../middleware/auth');

// router.get('/profile', auth, authController.getProfile);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController'); // Updated path to userController
const upload = require('../middleware/upload'); // Import multer middleware
const auth = require('../middleware/auth');

router.post('/signup', upload.single('profilePic'), authController.signup);
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, upload.single('profilePic'), authController.updateProfile); // New update route

module.exports = router;