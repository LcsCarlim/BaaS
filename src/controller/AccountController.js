const createAccountService = require('../services/Account/CreateAccountService');
const getAccountService = require('../services/Account/GetAccountService');
const findAccountByIdService = require('../services/Account/FindAccountByIdService');
const deleteAccountService = require('../services/Account/DeleteAccountService');
const updateAccountService = require('../services/Account/UpdateAccountService');
const depositAccountBalanceService = require('../services/Account/DepositAccountBalanceService');
const transferAccountBalanceService = require('../services/Account/TransferAccountBalanceService');

module.exports = {
  async createAccount (req, res) {
    try {
      const { id } = req.user;

      const accounts = await createAccountService(id);
      return res.json(accounts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: 'Creation failed!'
      });
    }
  },

  async listAccount (req, res) {
    try {
      const accounts = await getAccountService();
      return res.json(accounts);
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: 'Accounts not found!'
      });
    }
  },
  async findByIdAccount (req, res) {
    const { user_id } = req.params;
    try {
      const account = await findAccountByIdService(user_id);
      res.status(200).json(account);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async deleteAccount (req, res) {
    const { user_id } = req.params;

    try {
      await deleteAccountService(user_id);

      res.status(201).json({ message: 'Account deleted!' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateAccountService (req, res) {
    const { user_id } = req.params;

    const { balance } = req.body;

    try {
      await updateAccountService(user_id, balance);

      return res.status(200).json({
        message: 'Balance changed!'
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async depositBalance (req, res) {
    try {
      const { id } = req.user;
      const { balance } = req.body;

      const deposit = await depositAccountBalanceService(id, balance);
      res.json(deposit);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: 'Deposit failed!'
      });
    }
  },

  async transferBalances (req, res) {
    try {
      const { user_id } = req.params;
      const { id } = req.user;
      const { balance } = req.body;

      const transfer = await transferAccountBalanceService(user_id, id, balance);
      res.json(transfer);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message || 'Transfer failed!'
      });
    }
  }
};
