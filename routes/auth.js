const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validations');

router.post('/register', async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check duplicate email
  const checkDupEmail = await User.findOne({ email: req.body.email });
  if (checkDupEmail)
    return res.status(400).send('This email has already been registered.');

  // hash pw
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPw,
  });

  // save new user
  await user.save().then((user) => {
    res.status(200).json({ success: true, id: user._id });
  });
});

router.post('/login', async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email.');

  // check pw
  const validPw = await bcrypt.compare(req.body.password, user.password);
  if (!validPw) return res.status(400).send('Invalid login credentials');

  // create token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).json({ token, id: user._id });
});

module.exports = router;
