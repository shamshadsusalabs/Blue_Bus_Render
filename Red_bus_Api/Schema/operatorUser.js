// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'is invalid']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Method to compare password
  userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
// Create the user model
const OperatorUser = mongoose.model('OperatorUser', userSchema);

module.exports = OperatorUser;
