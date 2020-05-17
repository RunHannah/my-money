const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const seedTransactions = require('../seedTransactions.json');

const createTransactions = () => {
  seedTransactions.map(async (obj) => {
    let transaction = new Transaction({
      transactionName: `${obj.transactionName}`,
      date: `${obj.date}`,
      category: `${obj.category}`,
      amount: `${obj.amount}`,
    });

    await transaction.save();
  });
};

const connectDB = async () => {
  const uri = require('./keys').mongoURI;
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;

  db.once('open', async (_) => {
    // console.log('Database connected:', db);
    const eraseDatabaseOnSync = true;
    if (eraseDatabaseOnSync) {
      await Promise.all([Transaction.deleteMany({})]);
    }
    createTransactions();
  });

  db.on('error', (err) => {
    console.error('connection error:', err);
  });
};

module.exports = connectDB;
