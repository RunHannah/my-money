const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const verify = require('../middleware/verifyToken');

// all transactions
router.get('/transactions', async (req, res, next) => {
  const transactions = await Transaction.find({});
  res.status(200).json({ success: true, data: transactions });
});

// find single transaction
router.get('/transactions/:id', async (req, res, next) => {
  const transaction = await Transaction.findById({ _id: req.params.id });
  res.status(200).json({ success: true, data: transaction });
});

// find all transactions by user
router.get('/transactions/user/:userId', verify, async (req, res, next) => {
  const transactions = await Transaction.find({ userId: req.params.userId });
  res.status(200).json({ success: true, data: transactions });
});

router.post('/transactions', verify, async (req, res, next) => {
  const transaction = new Transaction(req.body);
  const savedTransaction = await transaction.save();
  res.status(200).json({ success: true, data: savedTransaction });
});

router.put('/transactions/:id', verify, async (req, res, next) => {
  const updated = await Transaction.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  if (updated) {
    const transaction = await Transaction.findOne({ _id: req.params.id });
    res.status(200).json({ success: true, data: transaction });
  }
});

router.delete('/transactions/:id', verify, async (req, res, next) => {
  const transaction = await Transaction.findByIdAndDelete({
    _id: req.params.id,
  });
  res.status(200).json({ success: true, data: transaction });
});

module.exports = router;
