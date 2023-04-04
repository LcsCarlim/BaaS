const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment');
require('moment/locale/pt-br');

// Só é possível se tornar Admin pelo banco de dados

const Admin = new mongoose.Schema({
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
    required: true,
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
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => moment().locale('pt-br')
  }
});

Admin.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;

  next();
});

module.exports = mongoose.model('Admin', Admin);
