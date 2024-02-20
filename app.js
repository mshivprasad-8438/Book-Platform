var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userauthRouter = require('./routes/userauth');
var bookssRouter=require("./routes/bookss");
var upload  = require('./middleware/uploads3');
var app = express();
var admnRouter=require('./routes/admin');

const bParser=require('body-parser');

app.use(bParser.urlencoded({extended:true}))
require("dotenv").config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//routes available 
app.use('/', indexRouter);
app.use('/admin',admnRouter);
app.use('/users', usersRouter);
app.use('/userauth',userauthRouter);
app.use('/bookss',bookssRouter);
app.use('/files', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
