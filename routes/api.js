const express = require('express');
const router = express.Router();

router.get('/transactions', function (req, res) {
  res.send({ type: 'GET' });
});

router.post('/transactions', function (req, res) {
  res.send({ type: 'POST' });
});

router.put('/transactions/:id', function (req, res) {
  res.send({ type: 'PUT' });
});

router.delete('/transactions/:id', function (req, res) {
  res.send({ type: 'DELETE' });
});

module.exports = router;
