const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Transaction = require('./models/transaction');
const seedTransactions = require('./seedTransactions.json');

const uri = require('./config/keys').mongoURI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', async (_) => {
  // console.log('Database connected:', db);
  const eraseDatabaseOnSync = true;
  if (eraseDatabaseOnSync) {
    await Promise.all([Transaction.deleteMany({})]);
  }
  createTransactions();
});

// db.on('error', (err) => {
//   console.error('connection error:', err);
// });

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(422).send({ error: err.message });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on ' + port);
});
