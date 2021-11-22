/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const eventRouter = require('./routes/eventsRoutes');
const clubRouter = require('./routes/clubsRoutes');
const homePageRouter = require('./routes/homePagesRoutes');
// const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  // If ran in dev environment => will use morgan
  app.use(morgan('dev')); // morgan logs the requests from API
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); // serve static files from folder, not route

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // When Request Happens
  next();
});

// Routes
const api = process.env.API;
app.use(`${api}/events`, eventRouter);
app.use(`${api}/clubs`, clubRouter);
app.use(`${api}/homePages`, homePageRouter);
// app.use(`${api}/users`, userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

// Flow:
//  Recieve request in app.js -> depending on the route, enter one of the routes -> from routes, execute one of the controllers
