const { Router } = require('express');
const routes = Router();
const UserController = require('../controller/UserController');
const userAuth = require('../middlewares/CheckTokenMiddleware');
const userLogout = require('../middlewares/LogoutMiddleware');

routes.get('/',
  userAuth,
  UserController.list
);

routes.get('/self',
  userAuth,
  UserController.listSelf
);

routes.get('/:id',
  userAuth,
  UserController.findById
);

routes.post('/auth',
  UserController.createUserAuth
);

routes.post('/logout',
  userLogout,
  UserController.logout
);

routes.post('/register',
  UserController.createUser
);

routes.delete('/delete/:id',
  userAuth,
  UserController.deleteUser
);

routes.patch('/update',
  userAuth,
  UserController.updateUser
);

module.exports = routes;
