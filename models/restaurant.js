var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
   
    id: String,
    title: String,
    thumb: String,
    description: String,
    menu: [String],
    tables: [String]
   
});


RestaurantSchema.statics.findRestaurant=  function(title, callback) {
    Restaurant.findOne({ title: title })
    .exec(function (error, restaurant) {
    if (error) {
        return  callback(error);
       //return error;
    } else if ( !restaurant ) {
        var err = new Error('Restaurant not found.');
        err.status = 401;
        return  callback(err);
       //return err;
    }
    else{
        console.log("U bazi je pronaden restoran: "+restaurant.title);
        //return restaurant;
        return  callback(null,restaurant);
        
    }   
    });
}

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;