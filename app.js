const createError = require('http-errors');
const express = require('express');
const path = require('path');
const initMiddleware = require('./middlewares/init');
const indexRouter = require('./routes/index');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', 'pug');

app.use(initMiddleware);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.error = err.message;
  res.locals.status = err.status || 500;

  // render the error page
  res.status(res.locals.status);
  res.render('error');
});

module.exports = app;