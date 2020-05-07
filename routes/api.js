const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const verify = require('../middleware/verifyToken');

// all transactions
router.get('/transactions', (req, res, next) => {
  Transaction.find({}).then((transactions) => {
    res.status(200).json({ success: true, data: transactions });
  });
});

// find single transaction
router.get('/transactions/:id', (req, res, next) => {
  Transaction.findById({ _id: req.params.id }).then((transaction) => {
    res.status(200).json({ success: true, data: transaction });
  });
});

router.post('/transactions', verify, (req, res, next) => {
  const transaction = new Transaction(req.body);
  transaction.save().then((transaction) => {
    res.status(200).json({ success: true, data: transaction });
  });
});

router.put('/transactions/:id', (req, res, next) => {
  Transaction.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Transaction.findOne({ _id: req.params.id }).then((transaction) => {
      res.status(200).json({ success: true, data: transaction });
    });
  });
});

router.delete('/transactions/:id', (req, res, next) => {
  Transaction.findByIdAndDelete({ _id: req.params.id }).then((transaction) => {
    res.status(200).json({ success: true, data: transaction });
  });
});

module.exports = router;
