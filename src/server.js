const config = require('.');

require('dotenv').config();

try {
  config.open('mongodb://localhost/BaaS').then(() => {
    config.app.listen(3333, () => {
      console.log('Server is running!');
    });
  });
} catch (error) {
  console.log(error.message);
};
