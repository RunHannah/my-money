const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { registerValidation } = require('../validations');

router.post('/register', async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check duplicate email
  const checkDupEmail = await User.findOne({ email: req.body.email });
  if (checkDupEmail)
    return res.status(400).send('This email has already been registered.');

  const user = new User(req.body);
  await user.save().then((user) => {
    res.status(200).json({ success: true, data: user });
  });
});

module.exports = router;
