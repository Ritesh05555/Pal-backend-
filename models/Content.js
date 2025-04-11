const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['blog', 'story', 'shayari', 'poem'],
    required: true,
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'love', 'anxious', 'calm', 'thoughtful'],
  },
  isDraft: { type: Boolean, default: false },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('Content', contentSchema);