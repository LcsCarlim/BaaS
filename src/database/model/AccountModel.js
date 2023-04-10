const mongoose = require('mongoose');

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
    updatedAt: 'updated_at'
  }
});

// a parte mongoose.model serve para criar um modelo no banco de dados.
module.exports = mongoose.model('Account', Account);
