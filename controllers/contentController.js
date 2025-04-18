// const Content = require('../models/Content');
// const cloudinary = require('../config/cloudinary');

// exports.getAllContent = async (req, res) => {
//   try {
//     const contents = await Content.find().populate('user', 'name profilePic').sort({ createdAt: -1 });
//     res.json(contents);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.createContent = [
//   ...require('../middleware/validate').validateContent,
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     const { title, body, type, mood } = req.body;
//     try {
//       let imageUrl = '';
//       if (req.file) {
//         const result = await cloudinary.uploader.upload(req.file.path);
//         imageUrl = result.secure_url;
//       }

//       const content = new Content({
//         title,
//         body,
//         type,
//         mood,
//         image: imageUrl,
//         user: req.user.id,
//       });
//       await content.save();
//       await User.findByIdAndUpdate(req.user.id, { $push: { history: content._id } });
//       res.json(content);
//     } catch (err) {
//       res.status(500).send('Server Error');
//     }
//   },
// ];

// exports.likeContent = async (req, res) => {
//   try {
//     const content = await Content.findById(req.params.id);
//     if (!content) return res.status(404).json({ message: 'Content not found' });

//     const userId = req.user.id;
//     const isLiked = content.likes.includes(userId);

//     if (isLiked) {
//       content.likes = content.likes.filter(id => id.toString() !== userId);
//     } else {
//       content.likes.push(userId);
//     }

//     await content.save();
//     res.json({ likes: content.likes.length });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };


// const Content = require('../models/Content');

// exports.createContent = async (req, res) => {
//   const { type, title, body, mood, isDraft } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : '';
//   const userId = req.user.id;

//   try {
//     const content = new Content({ type, title, body, mood, image, user: userId, isDraft });
//     await content.save();
//     res.status(201).json(content);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.getContentByType = async (req, res) => {
//   try {
//     const contents = await Content.find({ type: req.query.type, isDraft: false }).populate('user', 'name profilePic');
//     res.json(contents);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.getUserContents = async (req, res) => {
//   try {
//     const contents = await Content.find({ user: req.user.id }).populate('user', 'name profilePic');
//     res.json(contents);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.likeContent = async (req, res) => {
//   try {
//     const content = await Content.findById(req.params.id);
//     if (!content) return res.status(404).json({ message: 'Content not found' });

//     const userId = req.user.id;
//     const likeIndex = content.likes.indexOf(userId);

//     if (likeIndex === -1) {
//       content.likes.push(userId);
//     } else {
//       content.likes.splice(likeIndex, 1);
//     }

//     await content.save();
//     res.json(content);
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// const Content = require('../models/Content');

// exports.createContent = async (req, res) => {
//   const { type, title, body, mood, isDraft } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : '';
//   const userId = req.user.id;

//   try {
//     const content = new Content({ type, title, body, mood, image, user: userId, isDraft });
//     await content.save();
//     res.status(201).json(content);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.getContentByType = async (req, res) => {
//   try {
//     const contents = await Content.find({ type: req.query.type, isDraft: false }).populate('user', 'name profilePic');
//     res.json(contents);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.getUserContents = async (req, res) => {
//   try {
//     const contents = await Content.find({ user: req.user.id }).populate('user', 'name profilePic');
//     res.json(contents);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.likeContent = async (req, res) => {
//   try {
//     const content = await Content.findById(req.params.id);
//     if (!content) return res.status(404).json({ message: 'Content not found' });

//     const userId = req.user.id;
//     const likeIndex = content.likes.indexOf(userId);

//     if (likeIndex === -1) {
//       content.likes.push(userId);
//     } else {
//       content.likes.splice(likeIndex, 1);
//     }

//     await content.save();
//     res.json(content);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

//////////////////////////////////////////////
/////////////////////////////////////////////////////
// const Content = require('../models/Content');

// exports.getContents = async (req, res) => {
//   try {
//     console.log('Fetching contents with query:', req.query);
//     const { type } = req.query;
//     const query = type ? { type, isDraft: false } : { isDraft: false };
//     const contents = await Content.find(query).populate('user', 'name').sort({ createdAt: -1 });
//     console.log('Contents fetched:', contents);
//     res.json(contents);
//   } catch (err) {
//     console.error('Get contents error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.getUserContents = async (req, res) => {
//   try {
//     console.log('Fetching user contents for user ID:', req.user.id);
//     const { type } = req.query;
//     const query = type ? { user: req.user.id, type, isDraft: { $in: [false, true] } } : { user: req.user.id, isDraft: { $in: [false, true] } };
//     const contents = await Content.find(query).populate('user', 'name').sort({ createdAt: -1 });
//     console.log('User contents fetched:', contents);
//     res.json(contents);
//   } catch (err) {
//     console.error('Get user contents error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.getContentById = async (req, res) => {
//   try {
//     const content = await Content.findById(req.params.id).populate('user', 'name');
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
//     res.json(content);
//   } catch (err) {
//     console.error('Get content by ID error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.createContent = async (req, res) => {
//   const { title, body, type, mood, isDraft } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : '';
//   try {
//     console.log('Creating content with data:', { title, body, type, mood, isDraft, image });
//     const content = new Content({
//       title,
//       body,
//       type,
//       mood,
//       image,
//       user: req.user.id,
//       isDraft,
//     });
//     await content.save();
//     console.log('Content created:', content);
//     res.status(201).json(content);
//   } catch (err) {
//     console.error('Create content error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.likeContent = async (req, res) => {
//   try {
//     const content = await Content.findById(req.params.id);
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
//     if (!content.likes.includes(req.user.id)) {
//       content.likes.push(req.user.id);
//       await content.save();
//     }
//     console.log('Content liked:', content);
//     res.json(content);
//   } catch (err) {
//     console.error('Like content error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

////////////////////
//org

// const Content = require('../models/Content');

// exports.getContents = async (req, res) => {
//   try {
//     console.log('Fetching contents with query:', req.query);
//     const { type } = req.query;
//     const query = type ? { type, isDraft: false } : { isDraft: false };
//     const contents = await Content.find(query).populate('user', 'name').sort({ createdAt: -1 });
//     console.log('Contents fetched:', contents);
//     res.json(contents);
//   } catch (err) {
//     console.error('Get contents error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.getUserContents = async (req, res) => {
//   try {
//     console.log('Fetching user contents for user ID:', req.user.id);
//     const { type } = req.query;
//     const query = type ? { user: req.user.id, type, isDraft: { $in: [false, true] } } : { user: req.user.id, isDraft: { $in: [false, true] } };
//     const contents = await Content.find(query).populate('user', 'name').sort({ createdAt: -1 });
//     console.log('User contents fetched:', contents);
//     res.json(contents);
//   } catch (err) {
//     console.error('Get user contents error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.getContentById = async (req, res) => {
//   try {
//     const content = await Content.findById(req.params.id).populate('user', 'name');
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
//     res.json(content);
//   } catch (err) {
//     console.error('Get content by ID error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.createContent = async (req, res) => {
//   const { title, body, type, mood, isDraft } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : '';
//   try {
//     console.log('Creating content with data:', { title, body, type, mood, isDraft, image });
//     const content = new Content({
//       title,
//       body,
//       type,
//       mood,
//       image,
//       user: req.user.id,
//       isDraft,
//     });
//     await content.save();
//     console.log('Content created:', content);
//     res.status(201).json(content);
//   } catch (err) {
//     console.error('Create content error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.likeContent = async (req, res) => {
//   try {
//     const content = await Content.findById(req.params.id);
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
//     if (!content.likes.includes(req.user.id)) {
//       content.likes.push(req.user.id);
//       await content.save();
//     }
//     console.log('Content liked:', content);
//     res.json(content);
//   } catch (err) {
//     console.error('Like content error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

///////////////////////////////////////////
// ori
// const Content = require('../models/Content');

// exports.getContents = async (req, res) => {
//   try {
//     console.log('Fetching contents with query:', req.query);
//     const { type } = req.query;
//     const query = type ? { type, isDraft: false } : { isDraft: false };
//     const contents = await Content.find(query).populate('user', 'name').sort({ createdAt: -1 });
//     console.log('Contents fetched:', contents);
//     res.json(contents);
//   } catch (err) {
//     console.error('Get contents error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.getUserContents = async (req, res) => {
//   try {
//     console.log('Fetching user contents for user ID:', req.user.id);
//     const { type } = req.query;
//     const query = type ? { user: req.user.id, type, isDraft: { $in: [false, true] } } : { user: req.user.id, isDraft: { $in: [false, true] } };
//     const contents = await Content.find(query).populate('user', 'name').sort({ createdAt: -1 });
//     console.log('User contents fetched:', contents);
//     res.json(contents);
//   } catch (err) {
//     console.error('Get user contents error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.getContentById = async (req, res) => {
//   try {
//     const content = await Content.findById(req.params.id).populate('user', 'name');
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
//     res.json(content);
//   } catch (err) {
//     console.error('Get content by ID error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.createContent = async (req, res) => {
//   const { title, body, type, mood, isDraft } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : '';
//   try {
//     console.log('Creating content with data:', { title, body, type, mood, isDraft, image });
//     const content = new Content({
//       title,
//       body,
//       type,
//       mood,
//       image,
//       user: req.user.id,
//       isDraft,
//     });
//     await content.save();
//     console.log('Content created:', content);
//     res.status(201).json(content);
//   } catch (err) {
//     console.error('Create content error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.likeContent = async (req, res) => {
//   try {
//     const content = await Content.findById(req.params.id);
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
//     if (!content.likes.includes(req.user.id)) {
//       content.likes.push(req.user.id);
//       await content.save();
//     }
//     console.log('Content liked:', content);
//     res.json(content);
//   } catch (err) {
//     console.error('Like content error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.deleteContent = async (req, res) => {
//   try {
//     const content = await Content.findById(req.params.id);
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
//     // Check if the requesting user is the content owner
//     if (content.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Unauthorized to delete this content' });
//     }
//     await Content.deleteOne({ _id: req.params.id });
//     console.log('Content deleted:', content);
//     res.json({ message: 'Content deleted successfully' });
//   } catch (err) {
//     console.error('Delete content error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };


const Content = require('../models/Content');
const cloudinary = require('../config/cloudinary'); // Ensure this is set up
const fs = require('fs');

exports.getContents = async (req, res) => {
  try {
    console.log('Fetching contents with query:', req.query);
    const { type } = req.query;
    const query = type ? { type, isDraft: false } : { isDraft: false };
    const contents = await Content.find(query).populate('user', 'name').sort({ createdAt: -1 });
    console.log('Contents fetched:', contents);
    res.json(contents);
  } catch (err) {
    console.error('Get contents error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getUserContents = async (req, res) => {
  try {
    console.log('Fetching user contents for user ID:', req.user.id);
    const { type } = req.query;
    const query = type ? { user: req.user.id, type, isDraft: { $in: [false, true] } } : { user: req.user.id, isDraft: { $in: [false, true] } };
    const contents = await Content.find(query).populate('user', 'name').sort({ createdAt: -1 });
    console.log('User contents fetched:', contents);
    res.json(contents);
  } catch (err) {
    console.error('Get user contents error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate('user', 'name');
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (err) {
    console.error('Get content by ID error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.createContent = async (req, res) => {
  const { title, body, type, mood, isDraft } = req.body;
  let imageUrl = null;

  try {
    console.log('Creating content with data:', { title, body, type, mood, isDraft, file: req.file ? req.file.filename : null });

    if (req.file && (type === 'blog' || type === 'story')) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'image',
      });
      imageUrl = result.secure_url;
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to delete local file:', err);
      });
    }

    const content = new Content({
      title,
      body,
      type,
      mood,
      image: imageUrl,
      user: req.user.id,
      isDraft: isDraft === 'true' || isDraft === true, // Handle both string and boolean
    });
    await content.save();
    console.log('Content created:', content);
    res.status(201).json(content);
  } catch (err) {
    console.error('Create content error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.likeContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    if (!content.likes.includes(req.user.id)) {
      content.likes.push(req.user.id);
      await content.save();
    }
    console.log('Content liked:', content);
    res.json(content);
  } catch (err) {
    console.error('Like content error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    // Check if the requesting user is the content owner
    if (content.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this content' });
    }
    await Content.deleteOne({ _id: req.params.id });
    console.log('Content deleted:', content);
    res.json({ message: 'Content deleted successfully' });
  } catch (err) {
    console.error('Delete content error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};