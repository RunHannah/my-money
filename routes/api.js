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

// find all transactions by user
router.get('/transactions/user/:userId', verify, (req, res, next) => {
  Transaction.find({ userId: req.params.userId }).then((transactions) => {
    res.status(200).json({ success: true, data: transactions });
  });
});

router.post('/transactions', verify, (req, res, next) => {
  const transaction = new Transaction(req.body);
  transaction.save().then((transaction) => {
    res.status(200).json({ success: true, data: transaction });
  });
});

router.put('/transactions/:id', verify, (req, res, next) => {
  Transaction.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Transaction.findOne({ _id: req.params.id }).then((transaction) => {
      res.status(200).json({ success: true, data: transaction });
    });
  });
});

router.delete('/transactions/:id', verify, (req, res, next) => {
  Transaction.findByIdAndDelete({ _id: req.params.id }).then((transaction) => {
    res.status(200).json({ success: true, data: transaction });
  });
});

module.exports = router;
