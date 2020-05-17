const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
});

mongoose.models = {};

module.exports = mongoose.model('User', UserSchema);
