const express=require('express');
const router = express.Router();
var User = require('../models/user.js');
var Restaurant = require('../models/restaurant.js');

//get naslovna stranica
router.get('/',(req,res)=>{
    if(req.session.uniqueID)
        res.redirect('/user');
    else
        res.render('index');
})

router.post('/',(req,res)=>{
  if(req.session.uniqueID)
      res.redirect('/user');
  else
      res.render('index');
})

//login postojeceg korisnika
router.post('/login', function(req, res) {
    if (req.body.username && req.body.password) {
      User.authenticate(req.body.username, req.body.password, function (error, user) {
        if (!user) {
          res.redirect('/');
        }  else {
          req.session.uniqueID = user.username;
          res.redirect('/user');
        }
      });
    } 
  });

//registracija novog korisnika
router.post('/register', function(req, res, next) {
    if (req.body.Newusername && req.body.Newemail && req.body.Newpassword && req.body.confirmPassword) {
  
        // confirm that user typed same password twice
        if (req.body.Newpassword !== req.body.confirmPassword) {
          var err = new Error('Passwords do not match.');
          err.status = 400;
          return next(err);
        }
        console.log("OK");
        // create object with form input
        var userData = {
          username: req.body.Newusername,
          password: req.body.Newpassword,
          email: req.body.Newemail
        };
        console.log(userData);
  
        // use schema's `create` method to insert document into Mongo
        User.create(userData, function (error, user) {
          if (error) {
            return next(error);
          } else {
            req.session.uniqueID = user.username;
            return res.redirect('/user');
          }
        });
  
      }else
      return res.send("some error is here");
})


//dohvaćanje profila korisnika
router.get('/user',function(req,res){   
    if(req.session.uniqueID){
        res.render('user',  { ImeKorisnika : req.session.uniqueID} );
    }
    else
        res.redirect('/');
       
})


//odjava korisnika
router.post('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
})


router.get('/restaurants', (req,res,next)=>{

  //console.log("bbbb" + res);
    var err = new Error('Korisnik nije ulogiran');
    if(req.session.uniqueID)
        return res.render('restaurants', { ImeKorisnika:req.session.uniqueID });        
    else
        next(err);
 });


router.get('/actions', (req,res,next)=>{
    var err = new Error('Korisnik nije ulogiran');
    if(req.session.uniqueID)
        return res.render('actions', { ImeKorisnika:req.session.uniqueID });
    else
        next(err);
 });


module.exports = router;

