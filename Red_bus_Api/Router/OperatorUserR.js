// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../Controller/OperatorUserC');

// Signup route
router.post('/signup', userController.signup);

// Login route
router.post('/login', userController.login);

// Logout route
router.post('/logout', userController.logout);

// Get user by ID
router.get('/:id', userController.getUser);

// Update user by ID
router.put('/:id', userController.updateUser);

// Delete user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
