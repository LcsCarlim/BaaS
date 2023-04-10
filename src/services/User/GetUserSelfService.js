// se responsabiliza exibir as informações do próprio usuário para o mesmo
const UserModel = require('../../database/model/UserModel');

module.exports = async (id) => {
  const user = await UserModel.findById({
    _id: id
  });

  return {
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    address: user.address,
    phone_number: user.phone_number
  };
};
