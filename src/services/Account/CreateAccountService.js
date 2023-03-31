const AccountModel = require('../../database/model/AccountModel');
const UserModel = require('../../database/model/UserModel');

module.exports = async (user_id) => {
  const accountExists = await AccountModel.findOne({
    user_id
  });
  if (accountExists) throw new Error('User_id already exists!');

  const userExists = await UserModel.findOne({
    _id: user_id
  });
  if (!userExists) throw new Error('User_id already exists!');
  console.log(userExists);

  const account = await AccountModel.create({
    user_id,
    name: userExists.name,
    last_name: userExists.last_name
  });
  return {
    name: account.name,
    last_name: account.last_name,
    user_id: account.user_id,
    id: account.id,
    balance: account.balance,
    savings: account.savings

  };
};
