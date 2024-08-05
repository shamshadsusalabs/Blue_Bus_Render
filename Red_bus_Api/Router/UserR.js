const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserC');

// Signup route
router.post('/signup', userController.register);

// Login route
router.post('/login', userController.login);

// Logout route
router.post('/logout', userController.logout);



// Get user by ID route
router.get('/users/:id', userController.getUserById);

// Update user route
router.put('/users/:id', userController.updateUser);

// Delete user route
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
