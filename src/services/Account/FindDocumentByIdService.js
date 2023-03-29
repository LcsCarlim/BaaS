const AccountModel = require('../../database/model/AccountModel');

module.exports = async (user_id) => {
  const account = await AccountModel.findOne({ user_id });
  if (!account) throw new Error('Account not found');
  return account;
};
