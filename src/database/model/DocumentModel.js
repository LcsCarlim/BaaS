const mongoose = require('mongoose');

const Upload = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  document_type: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Upload', Upload);
