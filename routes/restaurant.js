const express=require('express');
const router = express.Router();
var Restaurant = require('../models/restaurant.js');
var Reservation = require('../models/reservation.js');

 //postavljanje vremena i datuma za rezervaciju
 router.post('/timeReservation',(req,res,next)=>{
  var err = new Error('All fields required');
  if(req.body.startTime && req.body.endTime && req.body.date){
     res.cookie('date', req.body.date);
     res.cookie('startTime', req.body.startTime);
     res.cookie('endTime', req.body.endTime);
     res.cookie('resName',req.body.resName);
     console.log("Rezervacija u restoranu "+req.body.resName+". Počinje: "+req.body.startTime+"h. Završava: "+req.body.endTime+"h. Datum: "+req.body.date);   
     res.render('tableReservation', { ImeKorisnika : req.session.uniqueID, prompt:req.body.resName});                 
  }
  else next(err);
 
})

//dohvacanje tlocrta
router.get('/timeReservation', (req, res, next) => {
  console.log("Ucitavanje tlocrta: "+req.cookies.resName);
  var err = new Error('Nesto se dogodilo');
  var array=[];
  var i;

  if(req.cookies.resName)
  {   
    Restaurant.findRestaurant(req.cookies.resName,function(error,restaurant){
          
            if (!restaurant) 
            {
              res.send("ne postoji taj restoran "+req.cookies.resName);
            }  
            else 
            {
              console.log("Restoran je "+req.cookies.resName+"\n");
              array[0]=restaurant;
              console.log(array[0]+"\n\n");

              var x = {
                restaurant: req.cookies.resName,
                date: req.cookies.date,
                startTime: req.cookies.startTime,
                endTime: req.cookies.endTime
              };
              array[1]=x;
              console.log(x);

              Reservation.find({ restaurant:req.cookies.resName,date:req.cookies.date/*,startTime:req.cookies.startTime*/ },function(error,result){
                if(!result) console.log("slobodan je ");
                else{
                  for(i=0;i<result.length;i++){
                    array[i+2]=result[i];
                    console.log("naso sam je: "+result[i]);              
                  }
                  console.log("OVO JE SAD SVE:\n\n"+array+"\nsad idu callback\n\n");
                  return res.json(array);
                }                  
              });

          }
        });      
  }
  else
    next(err);
});


router.get('/endReservation',(req,res,next)=>{

  console.log("Rezervacija novo "+req.cookies.resName+". Počinje: "+req.cookies.startTime+"h. Završava: "+req.cookies.endTime+"h. Datum: "+req.cookies.date+" "+req.cookies.table);
  console.log("prije" + req.session.uniqueID);


    if(req.cookies.table)
    {
      var reservationData = {
        user: req.session.uniqueID,
        restaurant: req.cookies.resName,
        date: req.cookies.date,
        startTime: req.cookies.startTime,
        endTime: req.cookies.endTime,
        table: req.cookies.table
      };
      console.log(reservationData);
   
      Reservation.create(reservationData,function(err,reservation){
        if(err) {
          return handleError(err);
        }
        else{
          console.log("U bazu je unesena rezervacija: "+reservation);
        }
      });

      return res.redirect('/restaurants');
      
      }
      else
      return res.send("some error is here");
  });

router.get("/:myreservations",(req,res,next)=>{
  Reservation.find({user:req.session.uniqueID},function(error,result){
    if(error) return error;
    else if(!result){
      return res.render('myReservations',{ImeKorisnika:req.session.uniqueID, array: []});
    }
    else{
      return res.render('myReservations',{ImeKorisnika:req.session.uniqueID, array:result});
    }
  });
});

module.exports = router;