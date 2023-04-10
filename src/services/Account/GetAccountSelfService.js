const AccountModel = require('../../database/model/AccountModel');

// se responsabiliza em exibir o próprio account para o usuário. Necessário estar logado.
module.exports = async (id) => {
  const user = await AccountModel.findOne({
    user_id: id
  });

  return {
    name: user.name,
    last_name: user.last_name,
    balance: user.balance,
    savings: user.savings
  };
};
