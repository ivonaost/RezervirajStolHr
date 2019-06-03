var mongoose = require('mongoose');

//fali ti ime korisnika 
var ReservationSchema = new mongoose.Schema({

    user: String,
    restaurant: String,
    date: String,
    startTime: String,
    endTime: String,
    table: String 
});



var Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;