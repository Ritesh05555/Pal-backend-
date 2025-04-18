// const User = require('../models/User');
// const Content = require('../models/Content');

// const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     const contents = await Content.find({ user: req.user.id });
    
//     const categorizedContent = {
//       blogs: contents.filter(c => c.type === 'blog'),
//       stories: contents.filter(c => c.type === 'story'),
//       shayaris: contents.filter(c => c.type === 'shayari'),
//       poems: contents.filter(c => c.type === 'poem'),
//       drafts: contents.filter(c => c.isDraft),
//     };

//     res.json({ user, contents: categorizedContent });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const updateProfile = async (req, res) => {
//   const { name, profilePic } = req.body;
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, profilePic },
//       { new: true }
//     ).select('-password');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { getProfile, updateProfile };



// const User = require('../models/User');
// const cloudinary = require('../config/cloudinary');

// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password').populate('history', 'title createdAt');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json({ user });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.updateProfile = async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.name = name || user.name;
//     user.email = email || user.email;

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path);
//       user.profilePic = result.secure_url;
//     }

//     await user.save();
//     res.json({ user });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.addToHistory = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.history.push(req.body.contentId);
//     await user.save();
//     res.json({ user });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

///////////////////////////////////////////////////////////////
/// ori
// const User = require('../models/User');
// const cloudinary = require('../config/cloudinary');

// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password createdAt updatedAt').populate('history', 'title createdAt');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json({ user });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.updateProfile = async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.name = name || user.name;
//     user.email = email || user.email;

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path);
//       user.profilePic = result.secure_url;
//     }

//     await user.save();
//     res.json({ user });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.addToHistory = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.history.push(req.body.contentId);
//     await user.save();
//     res.json({ user });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////

const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let profilePicUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'image',
      });
      profilePicUrl = result.secure_url;
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to delete local file:', err);
      });
    }

    const user = new User({ name, email, password, profilePic: profilePicUrl });
    await user.save();
    res.status(201).json({ message: 'User created', user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).send('Server Error');
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email profilePic');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).send('Server Error');
  }
};


exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      user.profilePic = result.secure_url;
    }

    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addToHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.history.push(req.body.contentId);
    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};