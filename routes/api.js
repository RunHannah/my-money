const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const verify = require('../middleware/verifyToken');

// all transactions
router.get('/transactions', async (req, res, next) => {
  await Transaction.find({})
    .then((transactions) => {
      if (transactions.length > 0)
        return res.status(200).json({ success: true, data: transactions });

      if (transactions.length === 0)
        return res.status(200).json({
          success: true,
          data: 'There are no transactions',
        });
    })
    .catch(next);
});

// find single transaction
router.get('/transactions/:id', async (req, res, next) => {
  await Transaction.findById({ _id: req.params.id })
    .then((transaction) => {
      res.status(200).json({ success: true, data: transaction });
    })
    .catch(next);
});

// find all transactions by user
router.get('/transactions/user/:userId', verify, async (req, res, next) => {
  await Transaction.find({ userId: req.params.userId }).then((transactions) => {
    if (transactions.length > 0)
      return res.status(200).json({ success: true, data: transactions });
  });
  if (transactions.length === 0)
    return res
      .status(200)
      .json({
        success: true,
        data: 'User has no transactions',
      })
      .catch(next);
});

router.post('/transactions', verify, async (req, res, next) => {
  const transaction = new Transaction(req.body);
  await transaction
    .save()
    .then((savedTransaction) => {
      res.status(200).json({ success: true, data: savedTransaction });
    })
    .catch(next);
});

router.put('/transactions/:id', verify, async (req, res, next) => {
  await Transaction.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(async (updated) => {
      if (updated) {
        await Transaction.findOne({ _id: req.params.id }).then(
          (transaction) => {
            res.status(200).json({ success: true, data: transaction });
          }
        );
      }
    })
    .catch(next);
});

router.delete('/transactions/:id', verify, async (req, res, next) => {
  await Transaction.findByIdAndDelete({
    _id: req.params.id,
  })
    .then((transaction) => {
      console.log('transaction', transaction);
      res.status(200).json({ success: true, data: transaction });
    })
    .catch(next);
});

module.exports = router;
