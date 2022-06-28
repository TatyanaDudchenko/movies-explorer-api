const express = require('express');
const {
  getMovies,
  createMovie,
  deleteMovieByID,
} = require('../controllers/movies');
const { isAuthtorized } = require('../middlewares/auth');
const {
  validationsCreateMovie,
  validationsDeleteMovieByID,
} = require('../middlewares/validations');

const moviesRoutes = express.Router();

moviesRoutes.get('/', isAuthtorized, getMovies);
moviesRoutes.post('/', isAuthtorized, express.json(), validationsCreateMovie, createMovie);
moviesRoutes.delete('/:movieId', isAuthtorized, validationsDeleteMovieByID, deleteMovieByID);

module.exports = {
  moviesRoutes,
};
