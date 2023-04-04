const createAccountService = require('../services/Account/CreateAccountService');
const getAccountService = require('../services/Account/GetAccountService');
const findAccountByIdService = require('../services/Account/FindAccountByIdService');
const updateAccountService = require('../services/Account/UpdateAccountService');
const depositAccountBalanceService = require('../services/Account/DepositAccountBalanceService');
const transferAccountBalanceService = require('../services/Account/TransferAccountBalanceService');
const savingsAccountService = require('../services/Account/SavingsAccountService');
const balanceAccountService = require('../services/Account/BalanceAccountService');
const getAccountSelfService = require('../services/Account/GetAccountSelfService');

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
        message: error.message
      });
    }
  },

  async listAccount (req, res) {
    const { role } = req.user;
    try {
      const accounts = await getAccountService(role);
      return res.json(accounts);
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },

  async selfAccount (req, res) {
    try {
      const { id } = req.user;
      const account = await getAccountSelfService(id);

      return res.json(account);
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message
      });
    }
  },

  async findByIdAccount (req, res) {
    const { role } = req.user;
    const { user_id } = req.params;
    try {
      const account = await findAccountByIdService(user_id, role);
      res.status(200).json(account);
    } catch (error) {
      res.status(404).json({ error: error.message });
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
        message: error.message
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
  },

  async savings (req, res) {
    try {
      const { id } = req.user;
      const { deposit } = req.body;

      const transfer = await savingsAccountService(id, deposit);
      res.json(transfer);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: 'Something wrong happened, try again',
        message: error.message || 'Transfer failed!'
      });
    }
  },
  async balance (req, res) {
    try {
      const { id } = req.user;
      const { deposit } = req.body;

      const transfer = await balanceAccountService(id, deposit);
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
