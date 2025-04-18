// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   profilePic: { type: String },
//   idNumber: { type: String, unique: true },
//   joiningDate: { type: Date, default: Date.now },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('User', userSchema);



// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   profilePic: String,
// });

// userSchema.methods.generateAuthToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User; // Ensure this is exporting the mode


// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   profilePic: String
  
// });

// userSchema.methods.generateAuthToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User;


/////////////////////////////////////////////////////////////
// ori
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   profilePic: String,
//   idNumber: { type: Number, unique: true, default: () => Math.floor(Math.random() * 1000000) } // Random 6-digit number
// }, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// userSchema.methods.generateAuthToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User;
////////////////////////////////////////////////////////////////////////

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: '/byde.png' }, // Updated to root-level path
  idNumber: { type: Number, unique: true, default: () => Math.floor(Math.random() * 1000000) }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
};

const User = mongoose.model('User', userSchema);
module.exports = User;