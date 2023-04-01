const mongoose = require('mongoose');
const moment = require('moment');
require('moment/locale/pt-br');

const Account = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  savings: {
    type: Number,
    default: 0
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => moment().locale('pt-br')
  }
});

module.exports = mongoose.model('Account', Account);
