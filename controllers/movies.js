const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ServerError = require('../errors/server-err');

const { NOT_FOUND_ERROR_CODE } = require('../utils/constants');

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
    const owner = req.user.id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
    } = req.body;
    const movie = new Movie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      owner,
      movieId,
    });
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
    const movieById = await Movie.findById(req.params._id);
    if (!movieById) {
      next(new NotFoundError('Фильм с указанным _id не найден')); // 404
      return;
    }
    const currentUserId = req.user.id;
    if (movieById.owner.toString() !== currentUserId) {
      next(new ForbiddenError('Нельзя удалять фильмы других пользователей')); // 403
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
    next(new ServerError('На сервере произошла ошибка')); // 500
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieByID,
};
