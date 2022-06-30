const validator = require('validator');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

// создаем схему
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: (v) => validator.isURL(v),
  },
  trailerLink: {
    type: String,
    required: true,
    validate: (v) => validator.isURL(v),
  },
  thumbnail: {
    type: String,
    required: true,
    validate: (v) => validator.isURL(v),
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    // ref: 'movie',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', movieSchema);
