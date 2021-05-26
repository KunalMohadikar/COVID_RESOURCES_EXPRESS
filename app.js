var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const pyApplication = require('./pythonUtil/pyapplication');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var countRouter = require('./routes/count');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.use('/', indexRouter);
app.use('/resource', usersRouter);
app.use('/count', countRouter);

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

mongoose.connect(
  `mongodb+srv://kunal:demo1234@cluster0.r28pq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection;

async function intervalFunc(){
  // await pyApplication();
  console.log("Hello");
}

function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

async function interval(){
  while(true){
    await pyApplication();
    await delay(1200000);
  }
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Hurray, We are Connected!!!');
  interval();
});

module.exports = app;
