const mongoose = require('mongoose');
//const Schema = require('Schema');
//childSchema should be on the top of code...
var locationSchema = mongoose.Schema({
  address:String,
  coordinates:[Number],
});
var reviewSchema = mongoose.Schema({
  name:String,
  id:String,
  review:String,
  rating:Number
});
//Inorder to do code optimization we create nested schema seperatly as we did
//for roomschema
var roomsSchema= mongoose.Schema(
  {
    type:String,
    number:Number,
    description:String,
    photos:[String],
    price:Number
})
// var hotelSchema = new Schema({
//
// });
// [OR] anything is same..........!!!we cam use anything....
// vra hotelSchema = mongoose.Schema({
//
// });
// var hotelSchema = mongoose.Schema({
//   name:String,
//   stars:Number,
//   photos:[String],
//   currency:String
//   //Inorder to do code optimization we create nested schema seperatly as we did
//   //for roomschema
//   rooms:[roomSchema],
//   location:[locationSchema],
//   review:[reviewSchema],
//   services:[String]
// });
//Schema for validation part
var hotelSchema = mongoose.Schema({
  //validation on name type
  name:{
    type:String,
    //we cannot go a head without filling this field
    required:true,
    //should be unique it checks for entire db for this
    // unique:true,


  },
  stars:{
    type:Number,
    min:0,
    max:5,
    //setting value to default
    //but inside javascript and in mongoose there
    //is a default keyword so keep it inside ""
    "default":0
  },
  description:String,
  photos:[String],
  currency:String,
  //Inorder to do code optimization we create nested schema seperatly as we did
  //for roomschema
  rooms:[roomsSchema],
  location:[locationSchema],
  review:[reviewSchema],
  services:[String]
},
{
  imgPath:String,
  "default": "https://www.clarionlbv.com/wp-content/uploads/2014/08/hotel-front-1.jpg"
}
);
//genertaing model object...
//incase we are not mentioning collection name the mongoose take care about it
//it will convert model name into all small letters Hotel --> hotel
mongoose.model('Hotel',hotelSchema,'hotels');
