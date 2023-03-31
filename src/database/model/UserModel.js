const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    selector: false
  },

  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
    // time stamps
  }
});

User.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;

  next();
});

module.exports = mongoose.model('User', User);
