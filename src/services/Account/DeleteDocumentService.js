const AccountModel = require('../../database/model/AccountModel');

module.exports = async (user_id) => {
  const accountExists = await AccountModel.findOne({ user_id });

  if (!accountExists) throw new Error('Account not exists');

  const deleteAccount = await AccountModel.deleteOne({ user_id });

  if (deleteAccount) {
    return 'Account deleted!';
  } else {
    throw new Error('Internal server error');
  }
};
