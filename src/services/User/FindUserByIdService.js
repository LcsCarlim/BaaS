// se responsabiliza em mostrar um usuário pelo ID dele. Só é possível sendo um Admin
const UserModel = require('../../database/model/UserModel');

module.exports = async (id, role) => {
  if (role !== 'Admin') throw new Error('Must be an admin');

  const user = await UserModel.findOne({
    _id: id
  });
  if (!user) throw new Error('User not found');

  if (user.length === 0) throw new Error('User not found');

  return user;
};
