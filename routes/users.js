const express = require('express');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserInfo);
usersRoutes.patch('/me', express.json(), updateUser);

module.exports = {
  usersRoutes,
};
