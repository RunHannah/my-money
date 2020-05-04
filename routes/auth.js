const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res, next) => {
  const user = new User(req.body);
  await user.save().then((user) => {
    res.status(200).json({ success: true, data: user });
  });
});

module.exports = router;
