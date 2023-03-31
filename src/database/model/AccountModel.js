const mongoose = require('mongoose');

const Account = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0
  },
  user_id: {
    type: String,
    required: true
  },
  savings: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Account', Account);
