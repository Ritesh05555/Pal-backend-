// const express = require('express');
// const router = express.Router();
// const {
//   createContent,
//   getContent,
//   updateContent,
//   deleteContent,
//   likeContent,
// } = require('../controllers/contentController');
// const authMiddleware = require('../middleware/auth');
// const { validateContent, validate } = require('../middleware/validate');

// router.post('/', authMiddleware, validateContent, validate, createContent);
// router.get('/', getContent);
// router.put('/:id', authMiddleware, validateContent, validate, updateContent);
// router.delete('/:id', authMiddleware, deleteContent);
// router.post('/:id/like', authMiddleware, likeContent);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const { getAllContent, createContent, likeContent } = require('../controllers/contentController');
// const upload = require('../middleware/upload');

// router.get('/', getAllContent);
// router.post('/', [auth, upload.single('image')], createContent);
// router.post('/like/:id', auth, likeContent);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const contentController = require('../controllers/contentController');
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload');

// router.post('/', auth, upload.single('image'), contentController.createContent);
// router.get('/', auth, contentController.getContentByType);
// router.get('/user', auth, contentController.getUserContents);
// router.post('/:id/like', auth, contentController.likeContent);

// module.exports = router;
////////////////////////////////////////////////
// const express = require('express');
// const router = express.Router();
// const contentController = require('../controllers/contentController');
// const auth = require('../middleware/auth');
// const upload = require('../middleware/upload');

// router.post('/', auth, upload.single('image'), contentController.createContent);
// router.get('/', auth, contentController.getContentByType);
// router.get('/user', auth, contentController.getUserContents);
// router.post('/:id/like', auth, contentController.likeContent);

// module.exports = router;

/////////////////////////////////////////
//////////////////////////////////////////

// const express = require('express');
// const router = express.Router();
// const contentController = require('../controllers/contentController');
// const upload = require('../middleware/upload');
// const auth = require('../middleware/auth');

// router.get('/', auth, contentController.getContents);
// router.get('/:id', auth, contentController.getContentById);
// router.post('/', auth, upload.single('image'), contentController.createContent);
// router.post('/:id/like', auth, contentController.likeContent);

// module.exports = router;

const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

router.get('/', auth, contentController.getContents); // All public content
router.get('/user', auth, contentController.getUserContents); // User-specific content
router.get('/:id', auth, contentController.getContentById);
router.post('/', auth, upload.single('image'), contentController.createContent);
router.post('/:id/like', auth, contentController.likeContent);
router.delete('/:id', auth, contentController.deleteContent); // New delete route

module.exports = router;