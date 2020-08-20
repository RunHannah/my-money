const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validations');

exports.registerNewUser = async (req, res, next) => {
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

  // create token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

  const savedUser = await user.save();
  res
    .header('x-auth-token', token)
    .json({ token, name: savedUser.name, id: savedUser._id });
};

exports.userLogin = async (req, res, next) => {
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
  res
    .header('x-auth-token', token)
    .json({ token, name: user.name, id: user._id });
};

exports.deleteUser = async (req, res, next) => {
  await User.remove({ _id: req.user.userId })
    .then((result) => {
      res.status(200).json({ message: 'User deleted' });
    })
    .catch(next);
};
