const AccountModel = require('../../database/model/AccountModel');

module.exports = async (user_id, balance, poupanca) => {
  const accountExists = await AccountModel.findOne({
    user_id
  });
  if (!accountExists) throw new Error('User_id already exists!');

  const account = await AccountModel.create({
    user_id,
    balance,
    poupanca
  });
  return account;
};
