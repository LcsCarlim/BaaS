const AccountModel = require('../../database/model/AccountModel');

// se responsabiliza em transferir de account para o outro account utilizando o ID. É necessário estar logado.
module.exports = async (user_id, id, deposit) => {
  const accountPayer = await AccountModel.findOne({
    user_id: id
  });

  if (!accountPayer) throw new Error('Account not found!');

  if (user_id === id) throw new Error('Transfer failed');

  if (accountPayer.balance < deposit) throw new Error('Insufficient balance');

  const accountReciver = await AccountModel.findOne({
    user_id
  });
  if (!accountReciver) throw new Error(`Account: ${user_id} not found!`);

  accountPayer.balance -= deposit;
  await accountPayer.save();

  accountReciver.balance += deposit;
  await accountReciver.save();

  return {
    deposit,
    Name: accountReciver.name,
    Last_Name: accountReciver.last_name
  };
};
