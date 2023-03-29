const DocumentModel = require('../../database/model/DocumentModel');
const UserModel = require('../../database/model/UserModel');

module.exports = async (filename, name, document_type, user_id) => {
  const userExists = await UserModel.findOne({
    _id: user_id
  });
  if (!userExists) throw new Error('User does not exists!');

  const accountUser = await DocumentModel.create({
    filename,
    name,
    document_type,
    user_id
  });

  return accountUser;
};
