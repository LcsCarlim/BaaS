const { Router } = require('express');

const multer = require('multer');
const routes = Router();

const multerConfig = require('../config/MulterConfig');
const DocumentController = require('../controller/DocumentController');
const userAuth = require('../middlewares/CheckTokenMiddleware');

routes.post('/upload',
  multer(multerConfig).single('filename'),
  userAuth,
  DocumentController.upload);

routes.get('/', DocumentController.list);

routes.get('/user',
  userAuth,
  DocumentController.findById);

module.exports = routes;
