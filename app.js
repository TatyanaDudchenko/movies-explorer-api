const express = require('express');

const { routes } = require('./routes/app');

const app = express();

app.post('/signin', express.json(), login);
app.post('/signup', express.json(), createUser);

app.use(routes);
