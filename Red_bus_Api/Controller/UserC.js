const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Schema/User'); // Adjust the path to your User model
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Replace with your actual secret key

const app = express();
app.use(express.json());

// User Registration
exports.register = async (req, res) => {
  const { email, mobile, password } = req.body;

  console.log('Register endpoint hit');
  console.log('Request Body:', req.body);

  try {
    console.log('Checking if email already exists...');
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      console.log('Email is already in use');
      return res.status(400).json({ message: 'Email is already in use' });
    }

    console.log('Checking if mobile number already exists...');
    const existingUserByMobile = await User.findOne({ mobile });
    if (existingUserByMobile) {
      console.log('Mobile number is already in use');
      return res.status(400).json({ message: 'Mobile number is already in use' });
    }

    console.log('Creating a new user...');
    const user = new User({ email, mobile, password });
    await user.save();
    console.log('User created successfully');

    console.log('Generating JWT token...');
    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
    console.log('JWT token generated:', token);

    console.log('Setting token in a cookie...');
    res.cookie('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// User Login
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

// User Logout
exports.logout = (req, res) => {
  // Clear the cookie
  res.clearCookie('authToken');
  res.json({ message: 'Logged out successfully' });
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { email, mobile, password } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if (password) {
      user.password = password;

      // Hash the password if it's updated
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};
