const UserModel = require('../../database/model/UserModel');

module.exports = async (id) => {
  const user = await UserModel.findById({ _id: id }).select('name last_name email address phone_number');

  return user;
};
