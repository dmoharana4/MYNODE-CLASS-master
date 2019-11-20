const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({

    name: {
        type:String,
        required:true,
    },
    role:{
        type:String,
        "default":"user",


        // required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
      
    },
   
    password:{
        type:String,
        required:true,
    },
    address:[String],
    phoneNumber:{
        type:Number,
        required:true,
    },
    activeStatus:{
        type:Boolean,
        "default":false
    },
    gender:{
        type:String,
        "default":"MALE"
        // required:true
    },
    regDate:{
        type:Date,
        "default":Date.now
    },
    lastLoginDate:{
        type:Date,
        "default":Date.now
    }

})

mongoose.model('User',usersSchema,'hot.users');