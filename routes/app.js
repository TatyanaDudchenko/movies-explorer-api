const express = require('express');
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const { isAuthtorized } = require('../middlewares/auth');

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);
routes.use('/', isAuthtorized, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден')); // 404
});

module.exports = {
  routes,
};
