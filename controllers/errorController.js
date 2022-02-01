const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  // search in keyValue to get the field
  const value = err.keyValue[Object.keys(err.keyValue)[0]];
  const message = `Duplicate field value: "${value}". Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please log in again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2.) Send  gerneric message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Mongoose bad ObjectID
    const error = { ...err };
    error.message = err.message;
    if (err.name === 'CastError') {
      err = handleCastErrorDB(err);
    }

    // Mongoose duplicate key/fields
    if (err.code === 11000) {
      err = handleDuplicateFieldsDB(err);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
      err = handleValidationErrorDB(err);
    }

    // JWT signature error
    if (err.name === 'JsonWebTokenError') {
      err = handleJWTError();
    }

    // Expired Token
    if (err.name === 'TokenExpiredError') {
      err = handleJWTExpiredError();
    }

    sendErrorProd(err, res);
  }
};
