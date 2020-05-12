const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  userId: {
    type: String,
    default: 'everyone',
  },
  transactionName: {
    type: String,
    required: [true, 'Name field is required'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    default: 'Dining',
  },
  amount: {
    type: Number,
    required: [true, 'expense field is required'],
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
