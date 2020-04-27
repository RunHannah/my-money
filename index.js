const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

const uri = require('./config/keys').mongoURI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', (_) => {
  console.log('Database connected:', db);
});

db.on('error', (err) => {
  console.error('connection error:', err);
});

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// client.connect((err, client) => {
//   if (err) throw err;
//   const db = client.db('finance-tracker');
//   console.log('connected to database');
// });

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on ' + port);
});
