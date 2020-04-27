const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
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
});

module.exports = mongoose.model('TransactionSchema', TransactionSchema);
