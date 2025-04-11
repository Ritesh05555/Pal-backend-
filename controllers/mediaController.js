const Media = require('../models/Media');
const { uploadToCloudinary } = require('../utils/cloudinaryUpload');

const uploadMedia = async (req, res) => {
  const { type, mood } = req.body;
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const folder = type === 'image' ? 'literary_haven/images' : 'literary_haven/music';
    const { url } = await uploadToCloudinary(file, folder);

    const media = new Media({
      user: req.user.id,
      type,
      url,
      mood,
    });
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMedia = async (req, res) => {
  const { mood } = req.query;
  try {
    const query = { user: req.user.id };
    if (mood) query.mood = mood;
    const media = await Media.find(query);
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { uploadMedia, getMedia };