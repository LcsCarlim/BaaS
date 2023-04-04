const AccountModel = require('../../database/model/AccountModel');

module.exports = async (id) => {
  const user = await AccountModel.findOne({ user_id: id });

  return {
    name: user.name,
    last_name: user.last_name,
    balance: user.balance,
    savings: user.savings
  };
};
