const Transaction = require('../models/transactionModel');

const tipsController = {
  getTips: async (req, res) => {
    try {
      const userId = req.user._id;
      const transactions = await Transaction.find({ userId }).sort({ date: -1 });

      let tips = [];
      const discretionaryExpenses = transactions.filter(transaction => 
        transaction.category === 'Entertainment' || transaction.category === 'Restaurants'
      );  // Filter transactions to find savings opportunities

      if (discretionaryExpenses.length > 0) {
        let totalDiscretionaryExpenses = discretionaryExpenses.reduce((sum, transaction) => sum + transaction.amount, 0);
        
        tips.push(`You've spent $${totalDiscretionaryExpenses} on entertainment and restaurants this month. Consider cutting down these expenses to increase your savings.`);
      } // If there are such expenses, we calculate them and offer advice on how to reduce them

      tips.push('Review your subscriptions and cancel those you no longer use.');
      tips.push('Compare prices before purchases, use discounts and coupons.');

      res.status(200).json({ tips });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = tipsController;