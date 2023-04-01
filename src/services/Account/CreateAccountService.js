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

  const account = await AccountModel.create({
    user_id,
    name: userExists.name,
    last_name: userExists.last_name
  });
  return account;
};
