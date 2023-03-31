const { Router } = require('express');

const routes = Router();

const userRoutes = require('../routes/user.routes');
const documentRoutes = require('../routes/document.routes');
const accountRoutes = require('../routes/account.routes');

routes.use('/users', userRoutes);
routes.use('/documents', documentRoutes);
routes.use('/accounts', accountRoutes);

module.exports = routes;
