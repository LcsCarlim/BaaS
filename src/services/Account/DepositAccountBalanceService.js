const AccountModel = require('../../database/model/AccountModel');

// depositar um valor para o balance. Necessário estar logado.
module.exports = async (user_id, deposit) => {
  const account = await AccountModel.findOne({
    user_id
  });
  if (!account) throw new Error('Account not found!');

  account.balance += deposit;
  await account.save();
  return account;
};
