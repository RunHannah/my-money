const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

router.get('/transactions', function (req, res, next) {
  Transaction.find((err, transactions) => {
    if (err) {
      console.log(err);
    } else {
      res.json(transactions);
    }
  });
});

router.post('/transactions', (req, res, next) => {
  let transaction = new Transaction(req.body);
  transaction
    .save()
    .then((transaction) => {
      // res.status(200).json({ transaction: 'transaction added successfully' });
      res.send(transaction);
    })
    .catch(next);
});

router.put('/transactions/:id', function (req, res, next) {
  res.send({ type: 'PUT' });
});

router.delete('/transactions/:id', function (req, res, next) {
  res.send({ type: 'DELETE' });
});

module.exports = router;
