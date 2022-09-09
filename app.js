require('dotenv').config();

const express = require('express');

const { PORT = 3001 } = process.env;
const { NODE_ENV, DATA_BASE } = process.env;
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { routes } = require('./routes/index');
const { DEV_DATA_BASE } = require('./utils/constants');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralizedErrorHandler } = require('./middlewares/centralizedErrorHandler');

console.log(process.env.NODE_ENV); // production

app.use(
  cors({
    origin: ['https://moviesexplorer.dudta.nomoredomains.sbs', 'http://moviesexplorer.dudta.nomoredomains.sbs'],
  }),
);

app.use(requestLogger); // подключаем логгер запросов

// app.get('/crash-test', () => { // после прохождения ревью код краш-теста необходимо удалить
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// здесь обрабатываем все ошибки
app.use(centralizedErrorHandler);

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : DEV_DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`Слушаем порт ${PORT}`);
  });
}

main();
