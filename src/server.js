// se responsabiliza em usar variaveis de ambiente, e permitir usar informações sensíveis sem expôr nada
require('dotenv').config();
const config = require('.');

// Rodar o servidor junto com o MongoDB

try {
  config.open('mongodb://localhost/BaaS').then(() => {
    config.app.listen(3333, () => {
      console.log('Server is running!');
    });
  });
} catch (error) {
  console.log(error.message);
};
