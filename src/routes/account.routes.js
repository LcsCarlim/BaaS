const { Router } = require('express');
const routes = Router();

const userAuth = require('../middlewares/CheckTokenMiddleware');

const AccountController = require('../controller/AccountController');

routes.post('/',
  userAuth,
  AccountController.createAccount
);

routes.post('/deposit',
  userAuth,
  AccountController.depositBalance
);

routes.post('/transfer/:user_id',
  userAuth,
  AccountController.transferBalances
);

routes.post('/transfering/savings',
  userAuth,
  AccountController.savings
);

routes.post('/transfering/balance',
  userAuth,
  AccountController.balance
);

routes.get('/get',
  userAuth,
  AccountController.listAccount
);

routes.get('/self',
  userAuth,
  AccountController.selfAccount
);

routes.get('/:user_id',
  userAuth,
  AccountController.findByIdAccount
);

routes.patch('/:user_id',
  AccountController.updateAccountService
);

module.exports = routes;
