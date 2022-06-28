const express = require('express');
const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');
const { isAuthtorized } = require('../middlewares/auth');
const {
  validationsUpdateUser,
} = require('../middlewares/validations');

const usersRoutes = express.Router();

usersRoutes.get('/me', isAuthtorized, getUserInfo);
usersRoutes.patch('/me', isAuthtorized, express.json(), validationsUpdateUser, updateUser);

module.exports = {
  usersRoutes,
};
