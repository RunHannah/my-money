const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // verified is user id
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please validate' });
  }
};
