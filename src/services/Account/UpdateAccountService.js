const AccountModel = require('../../database/model/AccountModel');

module.exports = async (user_id, balance) => {
  const accountExists = await AccountModel.findOne({
    user_id
  });

  if (!accountExists) throw new Error('Account not exists');

  const updateAccount = await AccountModel.updateOne(
    balance
  );

  if (updateAccount) {
    return 'Balance changed!';
  } else {
    throw new Error('Updated failed!');
  }
};
