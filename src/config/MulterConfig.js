const multer = require('multer');
const crypto = require('crypto');

// Se responsabiliza em interceptar o upload e salvar o arquivo em uma pasta

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './temp/uploads');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buf) => {
      if (err) return cb(err);
      const filename = buf.toString('hex') + '-' + file.originalname;
      return cb(null, filename);
    });
  }

});
const upload = multer({ storage });

module.exports = upload;
