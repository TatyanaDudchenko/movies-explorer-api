const express = require('express');

const { routes } = require('./routes/app');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(requestLogger); // подключаем логгер запросов


app.post('/signin', express.json(), login);
app.post('/signup', express.json(), createUser);

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
