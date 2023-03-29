const mongoose = require('mongoose');

const Upload = new mongoose.Schema({
  filename: {
    type: String
  }
});

module.exports = mongoose.model('Upload', Upload);

// app.post('/upload', upload.single('file'), (req, res) => {
//   console.log(req.file);
//   res.send('Arquivo enviado com sucesso!');
// });
