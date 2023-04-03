const UserModel = require('../../database/model/UserModel');

module.exports = async (id) => {
  const users = await UserModel.findOne({ _id: id });

  return users;
};
