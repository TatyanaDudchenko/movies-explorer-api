const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(200).send(movies);
  } catch (err) {
    next(new ServerError('На сервере произошла ошибка')); // 500
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movieId = req.movie.id;
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail } = req.body;
    const movie = new Movie({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId });
    res.status(201).send(await movie.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании карточки фильма')); // 400
      return;
    }
    next(new ServerError('На сервере произошла ошибка')); // 500
  }
};

const deleteMovieByID = async (req, res, next) => {
  try {
    const movieById = await Movie.findById(req.params.movieId);
    if (!movieById) {
      next(new NotFoundError('Фильм с указанным _id не найден')); // 404
      return;
    }
    const currentUserId = req.user.id;
    if (movieById.owner.toString() !== currentUserId) {
      next(new ForbiddenError('Нельзя удалить чужой фильм')); // 403
      return;
    }
    res.status(200).send(await movieById.deleteOne());
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Передан некорректный _id фильма')); // 400
      return;
    }
    if (err.statusCode === NOT_FOUND_ERROR_CODE) {
      next(new NotFoundError('Фильм с указанным _id не найден')); // 404
      return;
    }
    if (err.statusCode === FORBIDDEN_ERROR_CODE) {
      next(new ForbiddenError('Нельзя удалить чужой фильм')); // 403
      return;
    }
    next(new ServerError('На сервере произошла ошибка')); // 500
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieByID,
};
