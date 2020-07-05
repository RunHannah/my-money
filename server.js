const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const connectDB = require('./config/db');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Connect to database
connectDB();

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Listening on ' + port);
});