const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById({ _id: verified.id, 'tokens.token': token })

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please validate' });
  }
};
