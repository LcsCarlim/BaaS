const express = require('express');

const { routes } = require('../src/routes/routes');

const mongoose = require('mongoose');

async function open (uri) {
  await mongoose.connect(uri);
}

const app = express();

app.use(express.json());

app.use(routes);

module.exports = { app, open, routes };