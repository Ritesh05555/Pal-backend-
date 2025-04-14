// const mongoose = require('mongoose');

// const mediaSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   type: { type: String, enum: ['image', 'music'], required: true },
//   url: { type: String, required: true },
//   mood: {
//     type: String,
//     enum: ['happy', 'sad', 'love', 'anxious', 'calm', 'thoughtful'],
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Media', mediaSchema);

const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'music'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Media', mediaSchema);