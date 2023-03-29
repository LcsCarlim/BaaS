const UserModel = require('../../database/model/UserModel');

module.exports = async (name, last_name, email, password) => {
  const userExists = await UserModel.findOne({
    email
  });
  if (!userExists) throw new Error('Email already exists!');

  const user = await UserModel.create({
    name,
    last_name,
    email,
    password
  });

  return user;
};
