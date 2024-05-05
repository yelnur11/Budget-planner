const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true,
    enum: ['Checking', 'Savings', 'Credit Card', 'Investment']
  },
  accountNumber: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  currency: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;