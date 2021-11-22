/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');

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
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;

// Flow:
//  Recieve request in app.js -> depending on the route, enter one of the routes -> from routes, execute one of the controllers
