const User = require('../models/User');
const Content = require('../models/Content');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const contents = await Content.find({ user: req.user.id });
    
    const categorizedContent = {
      blogs: contents.filter(c => c.type === 'blog'),
      stories: contents.filter(c => c.type === 'story'),
      shayaris: contents.filter(c => c.type === 'shayari'),
      poems: contents.filter(c => c.type === 'poem'),
      drafts: contents.filter(c => c.isDraft),
    };

    res.json({ user, contents: categorizedContent });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  const { name, profilePic } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, profilePic },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, updateProfile };