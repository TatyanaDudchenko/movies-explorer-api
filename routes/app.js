const express = require('express');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

module.exports = {
  routes,
};
