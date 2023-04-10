// se responsabiliza em transferir valor do balance para o savings. É necessário estar logado
const AccountModel = require('../../database/model/AccountModel');

module.exports = async (user_id, deposit) => {
  const account = await AccountModel.findOne({
    user_id
  });
  if (!account) throw new Error('Account not found!');

  if (account.balance < deposit) throw new Error('Insufficient balance');

  if (deposit <= 0) throw new Error('Invalid deposit amount');

  account.balance -= deposit;

  account.savings += deposit;

  await account.save();

  return {
    balanceAccount: account.balance,
    savingsAccount: account.savings
  };
};
