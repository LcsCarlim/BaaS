const bcrypt = require('bcryptjs');

const UserModel = require('../../database/model/UserModel');

module.exports = async (email, password) => {
  const userExists = await UserModel.findOne({ email });

  if (!userExists) throw new Error('User not exists');

  const hashedPassword = await bcrypt.hash(password, 12);

  const updateUser = await UserModel.updateOne(
    { email },
    { password: hashedPassword }
  );

  if (updateUser) {
    return 'Password changed!';
  } else {
    throw new Error('Updated failed!');
  }
};
