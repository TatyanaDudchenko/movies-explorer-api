const express = require('express');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', express.json(), createMovie);
moviesRoutes.delete('/:movieId', deleteMovieByID);

module.exports = {
  moviesRoutes,
};
