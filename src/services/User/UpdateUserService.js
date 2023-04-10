// esse service se responsabiliza em alterar a senha do usuário. Gerando um hash para um nova senha e não expôr dado sensível.
// Só possível se o usuário estiver logado

const bcrypt = require('bcryptjs');

const UserModel = require('../../database/model/UserModel');

module.exports = async (id, password) => {
  const userExists = await UserModel.findOne({
    _id: id
  });

  if (!userExists) throw new Error('User not exists');

  const hashedPassword = await bcrypt.hash(password, 12);

  const updateUser = await UserModel.updateOne(
    { password: hashedPassword }
  );

  if (updateUser) {
    return 'Password changed!';
  } else {
    throw new Error('Updated failed!');
  }
};
