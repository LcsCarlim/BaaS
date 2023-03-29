const { Router } = require('express');
const routes = Router();
const DocumentController = require('../controller/DocumentController');

routes.post('/upload', DocumentController.upload);

routes.get('/users/documents', DocumentController.list);

routes.get('/users/document/:user_id', DocumentController.getfindById);

module.exports = { routes };
