const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-err');

const {
  DEV_SECRET,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getToken = (id) => jwt.sign({ id }, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET, { expiresIn: '7d' });

const isAuthtorized = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationError('Необходима авторизация')); // 401
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация')); // 401
    return;
  }

  req.user = payload;

  next();
};

module.exports = {
  getToken,
  isAuthtorized,
};
