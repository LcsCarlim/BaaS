const AccountModel = require('../../database/model/AccountModel');

module.exports = async (user_id, role) => {
  if (role !== 'Admin') throw new Error('Must be an admin');

  const account = await AccountModel.findOne({ user_id });
  if (!account) throw new Error('Account not found');

  if (account.length === 0) throw new Error('Documents not found');

  return account;
};
