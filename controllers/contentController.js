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