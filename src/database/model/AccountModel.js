const mongoose = require('mongoose');

const Account = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0
  },
  user_id: {
    type: String
  },
  poupanca: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Account', Account);
