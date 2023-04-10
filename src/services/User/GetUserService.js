// se responsabiliza em listar todos os usuários, porém é necessário ser um Admin
const UserModel = require('../../database/model/UserModel');

module.exports = async (role) => {
  if (role !== 'Admin') throw new Error('Must be an admin');

  const users = await UserModel.find();

  if (users.length === 0) throw new Error('Users not found');

  return users;
};
