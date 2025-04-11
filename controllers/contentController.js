const Content = require('../models/Content');

const createContent = async (req, res) => {
  const { type, title, body, mood, isDraft } = req.body;
  try {
    const content = new Content({
      user: req.user.id,
      type,
      title,
      body,
      mood,
      isDraft,
    });
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getContent = async (req, res) => {
  try {
    const contents = await Content.find({ isDraft: false })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateContent = async (req, res) => {
  const { id } = req.params;
  const { title, body, mood, isDraft } = req.body;
  try {
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    if (content.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    content.title = title || content.title;
    content.body = body || content.body;
    content.mood = mood || content.mood;
    content.isDraft = isDraft !== undefined ? isDraft : content.isDraft;
    content.updatedAt = Date.now();
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteContent = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    if (content.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await content.remove();
    res.json({ message: 'Content deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const likeContent = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    if (content.likes.includes(req.user.id)) {
      content.likes = content.likes.filter(
        (like) => like.toString() !== req.user.id
      );
    } else {
      content.likes.push(req.user.id);
    }
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createContent,
  getContent,
  updateContent,
  deleteContent,
  likeContent,
};