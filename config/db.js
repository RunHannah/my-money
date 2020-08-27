const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const seedTransactions = require('../seedTransactions.json');

const createTransactions = () => {
  seedTransactions.map(async (obj) => {
    let transaction = new Transaction({
      description: `${obj.description}`,
      date: `${obj.date}`,
      category: `${obj.category}`,
      amount: `${obj.amount}`,
    });

    await transaction.save();
  });
};

const connectDB = async () => {
  await mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;

  db.once('open', async (_) => {
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
