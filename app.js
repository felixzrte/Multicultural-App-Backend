/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');

const eventRouter = require('./routes/eventsRoutes');

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  // If ran in dev environment => will use morgan
  app.use(morgan('dev')); // morgan logs the requests from API
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`)); // serve static files from folder, not route

app.use((req, res, next) => {
  console.log('Hello from the middleware 😁 ');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // When Request Happens
  next();
});

app.get('/', (req, res) => {
  res.send('Heroku Deploy Test!😁');
});

const api = process.env.API;

// Routes
app.use(`${api}/events`, eventRouter);

module.exports = app;

// Flow:
//  Recieve request in app.js -> depending on the route, enter one of the routes -> from routes, execute one of the controllers
