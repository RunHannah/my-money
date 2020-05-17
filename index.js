const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoose = require('mongoose');
const Transaction = require('./models/transaction');
const seedTransactions = require('./seedTransactions.json');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const uri = require('./config/keys').mongoURI;
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

// import routes
const authRoute = require('./routes/auth');
const apiRoute = require('./routes/transactions');

// Body parser
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/user', authRoute);
app.use('/api', apiRoute);

// error handling middleware
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(422).send({ error: err.message });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on ' + port);
});
