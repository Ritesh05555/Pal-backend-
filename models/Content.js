// const mongoose = require('mongoose');

// const contentSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   type: {
//     type: String,
//     enum: ['blog', 'story', 'shayari', 'poem'],
//     required: true,
//   },
//   title: { type: String, required: true },
//   body: { type: String, required: true },
//   mood: {
//     type: String,
//     enum: ['happy', 'sad', 'love', 'anxious', 'calm', 'thoughtful'],
//   },
//   isDraft: { type: Boolean, default: false },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date },
// });

// module.exports = mongoose.model('Content', contentSchema);
// const mongoose = require('mongoose');

// const contentSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   body: { type: String, required: true },
//   type: { type: String, enum: ['poem', 'blog', 'story', 'shayari'], required: true },
//   mood: { type: String, enum: ['happy', 'sad', 'love', 'anxious', 'calm', 'thoughtful'], required: true },
//   image: { type: String },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   isDraft: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Content', contentSchema);
/////////////////////////////////////////////////////////////
// const mongoose = require('mongoose');

// const contentSchema = new mongoose.Schema({
//   title: String,
//   body: String,
//   mood: { type: String, default: 'happy' },
//   image: String,
//   type: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   isDraft: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// });

// module.exports = mongoose.model('Content', contentSchema);

// const mongoose = require('mongoose');

// const contentSchema = new mongoose.Schema({
//   title: { type: String },
//   body: { type: String, required: true },
//   type: { type: String, enum: ['poem', 'blog', 'story', 'shayari'], required: true },
//   mood: { type: String, enum: ['happy', 'sad', 'love', 'anxious', 'calm', 'thoughtful'], default: 'happy' },
//   image: String,
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   isDraft: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// const Content = mongoose.model('Content', contentSchema);
// module.exports = Content;

////////////////////////////////////////////////////////////////////////////////
// // ori 
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String, required: true },
  type: { type: String, enum: ['poem', 'blog', 'story', 'shayari'], required: true },
  mood: { type: String, enum: ['happy', 'sad', 'love', 'anxious', 'calm', 'thoughtful'], default: 'happy' },
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isDraft: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: true }, // Add this line
  createdAt: { type: Date, default: Date.now },
});

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;

