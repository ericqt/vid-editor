import {fileURLToPath} from 'url';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
//import usersRouter from './routes/users.js';
//import trimRouter from './routes/trim/index.js';

var app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Prevents 404 error for favicon request
app.get('/favicon.ico', (req, rest) => rest.status(204));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('the request', req)
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('there was some error here', err)
  console.log('and the error message is', err.message)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
