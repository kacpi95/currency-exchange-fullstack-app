const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Min 6'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name too short'],
  },
});

module.exports = mongoose.model('User', userSchema);
