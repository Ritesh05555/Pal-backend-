// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       idNumber: `LH${Date.now()}`,
//     });

//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { signup, login };

// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     user = new User({
//       name,
//       email,
//       password: await bcrypt.hash(password, 10),
//       profilePic: req.file ? `/uploads/${req.file.filename}` : '',
//     });

//     await user.save();
//     const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).send('Server Error');
//   }
// };

// const User = require('../models/User'); // Verify the path is correct
// const bcrypt = require('bcryptjs');

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     console.log('Login attempt for email:', email);
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('User not found');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log('Password mismatch');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const token = user.generateAuthToken();
//     console.log('Login successful, token generated');
//     res.json({ token });
//   } catch (err) {
//     console.error('Login error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   const profilePic = req.file ? `/uploads/${req.file.filename}` : '';
//   try {
//     console.log('Signup attempt for email:', email); // Debug log
//     console.log('User model:', User); // Check if User is defined
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword, profilePic }); // This line caused the error
//     await user.save();
//     const token = user.generateAuthToken();
//     res.status(201).json({ token });
//   } catch (err) {
//     console.error('Signup error:', err.message);
//     res.status(400).json({ message: 'Bad Request', error: err.message });
//   }
// };

// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('name email profilePic');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ user });
//   } catch (err) {
//     console.error('Profile error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

///////////////////////////////////////////
//////////////////////////////////////
// orignal 

// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     console.log('Login attempt for email:', email); // Debug log
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('User not found');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log('Password mismatch');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const token = user.generateAuthToken();
//     console.log('Login successful, token generated:', token);
//     res.json({ token });
//   } catch (err) {
//     console.error('Login error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   const profilePic = req.file ? `/uploads/${req.file.filename}` : '';
//   try {
//     console.log('Signup attempt for email:', email, 'name:', name); // Debug log
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword, profilePic });
//     await user.save();
//     const token = user.generateAuthToken();
//     console.log('Signup successful, token generated:', token);
//     res.status(201).json({ token });
//   } catch (err) {
//     console.error('Signup error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// exports.getProfile = async (req, res) => {
//   try {
//     console.log('Fetching profile for user ID:', req.user.id); // Debug log
//     if (!req.user || !req.user.id) {
//       console.log('Invalid user object or ID:', req.user);
//       return res.status(401).json({ message: 'Invalid token or user ID' });
//     }
//     const user = await User.findById(req.user.id).select('name email profilePic');
//     if (!user) {
//       console.log('User not found with ID:', req.user.id);
//       return res.status(404).json({ message: 'User not found' });
//     }
//     console.log('Profile fetched successfully:', user);
//     res.json({ user });
//   } catch (err) {
//     console.error('Profile fetch error:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login attempt for email:', email); // Debug log
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ message: 'Password mismatch' });
    }
    const token = user.generateAuthToken();
    console.log('Login successful, token generated:', token);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const profilePic = req.file ? `/uploads/${req.file.filename}` : '';
  try {
    console.log('Signup attempt for email:', email, 'name:', name); // Debug log
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, profilePic });
    await user.save();
    const token = user.generateAuthToken();
    console.log('Signup successful, token generated:', token);
    res.status(201).json({ token });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    console.log('Fetching profile for user ID:', req.user.id); // Debug log
    if (!req.user || !req.user.id) {
      console.log('Invalid user object or ID:', req.user);
      return res.status(401).json({ message: 'Invalid token or user ID' });
    }
    const user = await User.findById(req.user.id).select('name email profilePic');
    if (!user) {
      console.log('User not found with ID:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Profile fetched successfully:', user);
    res.json({ user });
  } catch (err) {
    console.error('Profile fetch error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};