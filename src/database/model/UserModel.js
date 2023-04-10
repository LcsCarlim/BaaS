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
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    selector: false
  },

  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'User'
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// é responsável para que seja salvo no banco de dados, e a senha passada com hash
User.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;

  next();
});

module.exports = mongoose.model('User', User);
