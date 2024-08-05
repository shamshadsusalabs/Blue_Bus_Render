// controllers/userController.js
require('dotenv').config();
const User = require('../Schema/operatorUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

// Signup
exports.signup = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
    const newUser = new User({ email, mobile, password });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        email: newUser.email,
        mobile: newUser.mobile
      },
      token
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, mobile, password } = req.body;

  console.log('Login endpoint hit');
  console.log('Request Body:', req.body);

  try {
    let user;

    // Check if email is provided and find user by email
    if (email) {
      console.log('Finding user by email...');
      user = await User.findOne({ email });
    }

    // Check if mobile is provided and find user by mobile number
    if (mobile) {
      console.log('Finding user by mobile number...');
      user = await User.findOne({ mobile });
    }

    // If neither email nor mobile is provided, return an error
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    console.log('Comparing passwords...');
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log('Invalid password');
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
    console.log('JWT token generated:', token);

    // Set token in a cookie
    console.log('Setting token in a cookie...');
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};

// Get User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};