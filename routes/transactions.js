const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const TransactionsController = require('../controllers/transactions');

// all transactions
router.get('/transactions', TransactionsController.getTransactions);
// get one transaction
router.get('/transactions/:id', TransactionsController.getOneTransaction);
// find all transactions by user
router.get('/transactions/user/:userId', verify, TransactionsController.getUserTransactions);

router.post('/transactions', verify, TransactionsController.createTransaction);
router.put('/transactions/:id', verify, TransactionsController.updateOneTransaction);
router.delete('/transactions/:id', verify, TransactionsController.deleteTransaction);

module.exports = router;
