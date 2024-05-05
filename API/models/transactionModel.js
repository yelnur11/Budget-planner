const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credit Card', 'Debit Card', 'Electronic Transfer', 'Mobile Payment', 'Other'],
    default: 'Other'
  },
  status: {
    type: String,
    enum: ['Pending', 'Cleared', 'Cancelled', 'Failed'],
    default: 'Pending'
  },
  tags: [{
    type: String
  }]
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;