const express=require('express');
const app=express();
const bodyParser = require('body-parser');
var session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const pug = require('pug');

app.set('view engine', 'pug');

// mongodb connection
mongoose.connect("mongodb://localhost:27017/RezervirajStolHr");
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: '1354grdfsiojg874',
    resave: true,
    saveUninitialized: false
}));


const mainRoutes = require ('./routes/index.js');
app.use(mainRoutes);

const reservationRoutes = require ('./routes/restaurant.js');
app.use(reservationRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  // define as the last app.use callback
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  

app.listen(3000,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("listening on port 3000");
    }
});