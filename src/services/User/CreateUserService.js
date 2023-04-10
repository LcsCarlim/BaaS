// se responsabiliza para criação de um usuário. Tendo algumas obrigatoriedades.
const UserModel = require('../../database/model/UserModel');

module.exports = async (name, last_name, email, password, address, phone_number) => {
  const emailExists = await UserModel.findOne({
    email
  });
  if (emailExists) throw new Error('Email already exists!');

  const phoneNumberExists = await UserModel.findOne({
    phone_number
  });
  if (phoneNumberExists) throw new Error('Phone number already exists!');

  const user = await UserModel.create({
    name,
    last_name,
    email,
    password,
    address,
    phone_number
  });

  return user;
};
