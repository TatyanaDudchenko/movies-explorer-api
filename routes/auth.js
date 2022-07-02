const express = require('express');
const {
  login,
  createUser,
} = require('../controllers/users');
const {
  validationsLogin,
  validationsCreateUser,
} = require('../middlewares/validations');

const authRoutes = express.Router();

authRoutes.post('/signin', express.json(), validationsLogin, login);
authRoutes.post('/signup', express.json(), validationsCreateUser, createUser);

module.exports = {
  authRoutes,
};
