const express = require('express');
const swaggerUi = require('swagger-ui-express');

const mongoose = require('mongoose');

const routes = require('../src/routes');

const swaggerDocs = require('./swagger.json');

async function open (uri) {
  await mongoose.connect(uri);
}

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);

module.exports = { app, open, routes };
