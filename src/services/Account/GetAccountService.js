const AccountModel = require('../../database/model/AccountModel');

module.exports = async () => {
  const account = await AccountModel.find();

  return account;
};
