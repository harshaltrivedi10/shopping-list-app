const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log(token);

  // check for token
  if (!token)
    return res.status(401).json({ message: 'No token, unauthorized access' });

  try {
    // verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.srarys(400).json({ message: 'Invalid Token' });
  }
};

module.exports = auth;
