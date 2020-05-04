const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { registerValidation } = require('../validations');

router.post('/register', async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);
  await user.save().then((user) => {
    res.status(200).json({ success: true, data: user });
  });
});

module.exports = router;
