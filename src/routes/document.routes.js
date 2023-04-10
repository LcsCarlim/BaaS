const { Router } = require('express');

const multer = require('multer');
const routes = Router();

const multerConfig = require('../config/MulterConfig');
const DocumentController = require('../controller/DocumentController');
const userAuth = require('../middlewares/CheckTokenMiddleware');

// controle de rotas do Document, e passando a rota do autenticador para verificar o token do mesmo.
// configurando o multer para a rota de post.
routes.post('/upload',
  multer(multerConfig).single('filename'),
  userAuth,
  DocumentController.upload
);

routes.get('/',
  userAuth,
  DocumentController.list
);

routes.get('/:id',
  userAuth,
  DocumentController.findById
);

module.exports = routes;
