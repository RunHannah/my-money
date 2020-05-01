const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/transactions', function (req, res) {
  Transaction.find((err, transactions) => {
    if (err) {
      console.log(err);
    } else {
      res.json(transactions);
    }
  });
});

router.post('/transactions', (req, res) => {
  let transaction = new Transaction(req.body);
  transaction
    .save()
    .then((transaction) => {
      res.status(200).json({ transaction: 'transaction added successfully' });
    })
    .catch((err) => {
      console.log('error', err);
      res.status(400).send('adding new transaction failed');
    });
});

router.put('/transactions/:id', function (req, res) {
  res.send({ type: 'PUT' });
});

router.delete('/transactions/:id', function (req, res) {
  res.send({ type: 'DELETE' });
});

module.exports = router;
