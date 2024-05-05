const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  alertType: {
    type: String,
    required: true,
    enum: ['Budget', 'Transaction', 'Balance', 'Goal'],
  },
  readStatus: {
    type: Boolean,
    default: false
  },
  alertDate: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;