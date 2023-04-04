const AccountModel = require('../../database/model/AccountModel');

module.exports = async (user_id, deposit) => {
  const account = await AccountModel.findOne({
    user_id
  });
  if (!account) throw new Error('Account not found!');

  if (account.savings < deposit) throw new Error('Insufficient savings');

  if (deposit <= 0) throw new Error('Invalid deposit amount');

  account.savings -= deposit;

  account.balance += deposit;

  await account.save();

  return {
    savingsAccount: account.savings,
    balanceAccount: account.balance
  };
};
