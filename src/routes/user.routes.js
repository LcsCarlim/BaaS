const { Router } = require('express');
const routes = Router();
const UserController = require('../controller/UserController');
const userAuth = require('../middlewares/CheckTokenMiddleware');

routes.get('/',
  userAuth,
  UserController.list
);

routes.get('/self',
  userAuth,
  UserController.listInformation
);

routes.get('/:id',
  userAuth,
  UserController.findById
);

routes.post('/auth',
  UserController.createUserAuth
);

routes.post('/logout',
  UserController.logout
);

routes.post('/register',
  UserController.createUser
);

routes.delete('/delete/:id',
  userAuth,
  UserController.deleteUser
);

routes.patch('/:email',
  UserController.updateUser
);

module.exports = routes;
