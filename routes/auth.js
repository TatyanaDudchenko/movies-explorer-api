const express = require('express');
const {
  login,
  createUser,
} = require('../controllers/users');
const {
  validationsLogin,
  validationsCreateUser,
} = require('../middlewares/validations');

const signinRoute = express.Router();
const signupRoute = express.Router();

signinRoute.post('/', express.json(), validationsLogin, login);
signupRoute.post('/', express.json(), validationsCreateUser, createUser);

module.exports = {
  signinRoute,
  signupRoute,
};
