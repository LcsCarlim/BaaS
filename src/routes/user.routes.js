const { Router } = require('express');
const routes = Router();
const UserController = require('../controller/UserController');

routes.get('/',
  UserController.list
);

routes.get('/:id',
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

routes.delete('/:id',
  UserController.deleteUser
);

routes.patch('/:email',
  UserController.updateUser
);

module.exports = routes;
