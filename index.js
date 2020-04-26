const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const uri = require('./config/keys').mongoURI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, client) => {
  if (err) throw err;
  const db = client.db('finance-tracker');
  console.log('connected to database');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on ' + port);
});
