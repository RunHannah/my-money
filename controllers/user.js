const User = require('../models/user');
const Transaction = require('../models/transaction');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validations');

exports.registerNewUser = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details.map(x => x.message).join(', ') });
  // check duplicate email
  const checkDupEmail = await User.findOne({ email: req.body.email });
  if (checkDupEmail) return res.status(400).json({ error: 'This email has already been registered.' });
  // hash pw
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPw,
  });
  // create token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  user.tokens = user.tokens.concat({ token })
  const savedUser = await user.save();
  res
    .header('x-auth-token', token)
    .json({ name: savedUser.name, id: savedUser._id, user: savedUser });
};

exports.userLogin = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(422).json({ error: error.details.map(x => x.message).join(', ') });
  // check email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(422).json({ error: 'Email not found.' });
  // check pw
  const validPw = await bcrypt.compare(req.body.password, user.password);
  if (!validPw) return res.status(422).json({ error: 'Invalid password. Please try again' });
  // create token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  user.tokens = user.tokens.concat({ token })
  await user.save();

  res
    .header('x-auth-token', token)
    .json({ token, name: user.name, id: user._id, savedUser: user });
};

exports.deleteUser = async (req, res, next) => {
  try {
    await Transaction.deleteMany({ userId: req.user.id });
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'Your account and transactions have been deleted' })
  } catch(e) {
    res.status(500).send({ error: 'There has been is an error' })
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save();
    res.status(200).send({ status: 'You are logged out. '})
  } catch(e) {
    res.status(500).send();
  }
}
