/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

//NEW STUFF FOR REAL
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
//END NEW STUFF

const { config } = require('process');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const eventRouter = require('./routes/eventsRoutes');
const clubRouter = require('./routes/clubsRoutes');
const homePageRouter = require('./routes/homePagesRoutes');
const suggestionRouter = require('./routes/suggestionsRoutes');
const merchRouter = require('./routes/merchsRoutes')
const userRouter = require('./routes/userRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

// Global Middleware
// Set security HTTP headers
app.use(helmet());

// Dev logging
if (process.env.NODE_ENV === 'development') {
  // If ran in dev environment => will use morgan
  app.use(morgan('dev')); // morgan logs the requests from API
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['location', 'clubName'],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`)); // serve static files from folder, not route

// Testing middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // When Request Happens
  // console.log(req.headers);
  next();
});

//MORE NEW STUFF
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
//CHANGE THIS
const mongoURI =
  'mongodb+srv://felix:10026712@cluster0.g8a5g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const conn = mongoose.createConnection(mongoURI);
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) =>
    new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    }),
});
const upload = multer({ storage });
//END NEW STUFF
//NEW STUFF
// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', { files: false });
    } else {
      files.map((file) => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', { files: files });
    }
  });
});
// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  res.redirect('/');
});
// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist',
      });
    }

    // Files exist
    return res.json(files);
  });
});
// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }
    // File exists
    return res.json(file);
  });
});
// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});
// @route DELETE /files/:id
// @desc  Delete file
app.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect('/');
  });
});
//END NEW STUFF

// Routes
const api = process.env.API;
app.use(`${api}/events`, eventRouter);
app.use(`${api}/clubs`, clubRouter);
app.use(`${api}/homePages`, homePageRouter);
app.use(`${api}/suggestions`, suggestionRouter);
app.use(`${api}/merchs`, merchRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/bookings`, bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

// Flow:
// Recieve request in app.js -> depending on the route, enter one of the routes -> from routes, execute one of the controllers
