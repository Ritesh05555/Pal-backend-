const Media = require('../models/Media');
const cloudinary = require('../config/cloudinary');
const fs = require('fs'); // Add file system module to delete local file

exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: req.body.type === 'music' ? 'video' : 'image',
    });
    console.log('Cloudinary upload result:', result);

    // Save media to database
    const media = new Media({
      url: result.secure_url,
      type: req.body.type,
      user: req.user.id,
      content: req.body.contentId || null,
    });
    await media.save();

    // Delete the local temporary file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Failed to delete local file:', err);
    });

    res.json(media);
  } catch (err) {
    console.error('Upload error:', err); // Log the error for debugging
    res.status(500).send('Server Error');
  }
};