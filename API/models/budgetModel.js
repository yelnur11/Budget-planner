const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  forecastData: {
    monthlyIncome: { type: Number, required: true },
    monthlyExpense: { type: Number, required: true },
    savingsGoal: { type: Number }
  },
  categories: [{
    name: { type: String, required: true },
    plannedAmount: { type: Number, required: true },
    actualAmount: { type: Number, default: 0 }
  }],
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Cancelled'],
    default: 'Active'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;