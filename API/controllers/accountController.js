const Account = require('../models/accountModel');

const accountController = {
  addAccount: async (req, res) => {
    try {
      const { userId, accountDetails } = req.body;
      const account = new Account({ userId, ...accountDetails });
      await account.save();
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAccount: async (req, res) => {
    try {
      const { accountId } = req.params;
      const account = await Account.findById(accountId);
      if (!account) {
        return res.status(404).json({ message: 'Account not found.' });
      }
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteAccount: async (req, res) => {
    try {
      const { accountId } = req.params;
      const account = await Account.findByIdAndDelete(accountId);
      if (!account) {
        return res.status(404).json({ message: 'Account not found.' });
      }
      res.status(200).json({ message: 'The account has been deleted.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = accountController;