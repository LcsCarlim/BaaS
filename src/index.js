const express = require('express');
const swaggerUi = require('swagger-ui-express');

const mongoose = require('mongoose');

const routes = require('../src/routes');

const swaggerDocs = require('./swagger.json');

// se responsabiliza em conectar ao banco de dados utilizando a lib mongoose, sendo assim uma função assíncrona
async function open (uri) {
  await mongoose.connect(uri);
}

const app = express();

app.use(express.json());

// se responsabiliza em criar um rota para documentação em Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);

module.exports = { app, open, routes };
