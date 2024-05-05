const Budget = require('../models/budgetModel');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

const budgetController = {
  createForecast: async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send('User is not found.');
      }

      const transactions = await Transaction.find({ userId: user._id });
      const currentDate = new Date();
      const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      let income = 0;
      let expenses = 0;

      transactions.forEach(transaction => {
        if (transaction.date >= currentMonthStart && transaction.date <= currentDate) {
          if (transaction.type === 'INCOME') {
            income += transaction.amount;
          } else if (transaction.type === 'EXPENSE') {
            expenses += transaction.amount;
          }
        }
      });

      const forecastedBalance = user.currentBalance + income - expenses;

      res.status(200).json({
        forecastedBalance: forecastedBalance,
        income: income,
        expenses: expenses
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  getBudget: async (req, res) => {
    try {
      const { userId } = req.params;
      const budget = await Budget.findOne({ userId });
      if (!budget) {
        return res.status(404).json({ message: 'No budget found.' });
      }
      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateBudget: async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedData = req.body;
      const budget = await Budget.findOneAndUpdate({ userId }, updatedData, { new: true });
      if (!budget) {
        return res.status(404).json({ message: 'No budget found.' });
      }
      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};


module.exports = budgetController;