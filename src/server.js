require('dotenv').config();
const config = require('.');
try {
  config.open('mongodb://localhost/task').then(() => {
    config.app.listen(3333, () => {
      console.log('Server is running!');
    });
  });
} catch (error) {
  console.log(error.message);
};
