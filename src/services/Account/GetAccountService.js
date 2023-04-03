const AccountModel = require('../../database/model/AccountModel');

module.exports = async (role) => {
  if (role !== 'Admin') throw new Error('Must be an admin');

  const account = await AccountModel.find();

  if (account.length === 0) throw new Error('Users not found');

  return account;
};
