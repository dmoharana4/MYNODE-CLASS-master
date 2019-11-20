// var hotelData = require('../models/data/hotel-data.json');
var mongoose = require('mongoose');

//model object
var Hotel = mongoose.model('Hotel');

module.exports.getHotelsData = (req, res, next) => {
  // var connection = dbconn.get();
  // var db = connection.db('meanhotel');
  // var collection = db.collection('hotels');
  // var collection = dbconn.get().db('meanHotel').collection('hotels');
  var offset = 0;
  var count = 50;
  console.log(req.query);
  if (req.query && req.query.offset && req.query.count) {
    offset = parseInt(req.query.offset, 10);
    count = parseInt(req.query.count, 10);
  }

  Hotel.
  find()
    .skip(offset).limit(count)
    .exec(function(err, hotels) {
      if (err) {
        console.log(err);
        res
          .status(200)
          .json({
            error: err,
            message: 'Unable to fetch Records'
          })
      } else {
        console.log(hotels.length);
        res
          .status(200)
          .json(hotels);
      }

    }); //exec

} ;

module.exports.getHotelData = (req, res, next) => {
  // var collection = dbconn.get().db('meanhotel').collection('hotels');
  var hotelId = req.params.hotelId;
  console.log(hotelId);
  if (hotelId) {
    Hotel
    .findById(hotelId).exec(function(err, hotel) {
      res.status(200)
        .json(hotel);
    });  } else {
    res.status(200)
      .json({
        message: "Hotel Id is not found"
      })
  }
};


module.exports.getHotelReviews = (req, res, next) => {
  // var collection = dbconn.get().db('meanhotel').collection('hotels');
  var hotelId = req.params.hotelId;
  console.log(hotelId);
  if (hotelId) {
    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, reviews) {
      if (err) {
        res.status(404)
        .json({message : "Reviews not Found"});
      }
      res.status(200)
        .json(reviews);
    });  } else {
    res.status(200)
      .json({
        message: "Hotel Id is not found"
      })
  }
};

//Add Riviews...........
module.exports.addHotelReviews = (req, res, next) => {
  // var collection = dbconn.get().db('meanhotel').collection('hotels');
  var hotelId = req.params.hotelId;
  console.log(hotelId);
  if (hotelId) {
    
    // Tank.update({ _id: hotelId }, { $set: { "reviews": [req.body] }}, callback);
    var newReview = {$set:{'reviews':[req.body]}};
    Hotel.findByIdAndUpdate(hotelId,newReview,function(err,doc){
      if (err) {
        res
          .status(500)
          .json({message:"Reviews not added"})
      }else{
        res
          .status(200)
          .json(doc)
      }

    })

    } else {
    res.status(200)
      .json({
        message: "Hotel Id is not found"
      })
  }};

//putting data to server
module.exports.addHotelNew = (req, res, next) => {
  console.log('Add New Hotel');
  if (req.body && req.body.name && req.body.stars &&
    req.body.description) {
    var hotel = new Hotel(req.body);
    //save is like insert
    hotel.save(function(err, response) {
      if (err) {
        res.status(500)
          .json({message: "Hotel Insertion Failed",error:err});
      }
      res.status(200)
        .json(response);
  })}
else {
  console.log('Required Data is missing..!!');
  res.status(400).json({message: 'Required Data is missing..!!'});
}};

// console.log(req.body);
// res.status(200).json(hotel);

//Updating HOTEL
module.exports.updateHotel = (req, res, next) => {
  console.log('Update Hotel');
  var hotel = req.body;
  console.log(hotel);
  // var collection = dbconn.get().db('meanhotel').collection('hotels');
  if (hotel && hotel.filter && hotel.age && hotel.active) {
    let query = hotel.filter;
    let newValue = {
      $set: {
        age: hotel.age,
        active: hotel.active
      }
    };
    collection.updateOne(query, newValues, (err, dbres) => {
      if (err) {
        res.status(200).send("there is some error in updating db");
      } else {
        res.status(200).json(dbres);

      }
    })
  } else {
    res.status(404).send('Please fill all the required Info...');
  }
};
//Removing Hotel
module.exports.removeHotel = (req, res, next) => {
  var hotel = req.body;
  console.log(hotel);
  // var collection = dbconn.get().db('meanhotel').collection('hotels');
  if (hotel && hotel.filter) {
    let query = {
      name: hotel.filter
    };
    collection.deleteOne(query, (err, dbres) => {
      if (err) {
        res.status(404).send("some problem while removing data");
      } else {
        res.status(200).json(dbres)
      }
    })
  } else {
    res.status(404).send('please fill all the required fields')
  }

};
