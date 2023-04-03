const UserModel = require('../../database/model/UserModel');
const DocumentModel = require('../../database/model/DocumentModel');
const AccountModel = require('../../database/model/AccountModel');

module.exports = async (user_id, role) => {
  if (role !== 'Admin') throw new Error('Must be an admin');

  const userExists = await UserModel.findOne({ _id: user_id });

  if (userExists.length === 0) throw new Error('User not found');

  try {
    await AccountModel.deleteOne({ user_id });
    await DocumentModel.deleteOne({ user_id });
    await UserModel.findByIdAndDelete(user_id);
  } catch (error) {
    throw new Error('Error deleting user');
  }
};
