const Transaction = require('../models/transactionModel');

const transactionController = {
  syncTransactions: async (req, res) => {
    // Bank details
  },
  getTransactions: async (req, res) => {
    try {
      const { accountId } = req.params;
      const transactions = await Transaction.find({ accountId });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = transactionController;