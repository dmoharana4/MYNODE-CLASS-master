const mongoose = require('mongoose');
//choosing a schema from mongoose
//adding mongoose to a variable schema
//schema is constructor so capital S
const Schema = mongoose.Schema;
//Schema returns a object so storing in blogSchema
//model object
var blogSchema =  new Schema({
  title:String,
  author:String,
  //head is heading and body is paragraph
  //this thing can be replicated for any number of head and paragraph
  details:[{head:String,body:String,imagepath:String}],
  date:Date,
  reviews:String,
  ratings:Number,

});
//taking schema an converting into model...
//SYNTAX:mongoose.model('Model OB Name','Schema','collections')
var Blog=mongoose.model('Blog',blogSchema,'hotels');
