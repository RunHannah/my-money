const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  userId: {
    type: String,
    default: 'everyone',
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    default: 'Food',
  },
  amount: {
    type: Number,
    required: [true, 'expense field is required'],
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
