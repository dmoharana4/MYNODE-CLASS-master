var mongoose = require('mongoose');

var User = mongoose.model('User');


module.exports.getUsersData = (req , res , next)=>{
    var offset = 0;
    var count = 50;
    console.log(req.query);

if (req.query && req.query.offset && req.query.count) {
    offset = Number(req.query.offset);
    count = Number(req.query.count);
}

User
    .find()
        .skip(offset).limit(count)
        .exec(function(err , dbResponse){
            if (err) {
                console.log(err);
                res
                    .status(200)
                    .json({
                        error:err,
                        message : 'Unable to fetch Records'
                    })
            }else {
                console.log(dbResponse.length);
                res
                    .status(200)
                    .json(dbResponse);           
                   }
        });   
};




module.exports.getUserData = (req , res , next) => {
    var userId = req.param.userId;
    console.log(userId);
    if (userId) {
        User
            .findById(userId).exec(function(err , dbResponse){
               if (err) {
                res
                .status(200)
                .json({
                    error : err,
                    message: "User Id Not Found"
                });
               } else{
                  res
                   .status(200)
                   .json(dbResponse);
            }
        }) //exec
        
        }  
    };




module.exports.addUserNew = (req , res , next) => {

console.log("Add new User");

if (req.body && req.body.phoneNumber){

    var user = new User(req.body);

    user.save(function(err , response){
        if (err) {
            res
                .status(500)
                .json({
                    message:" User Insertion Failed",
                    error : err
                })
        } else{
        res
            .status(200)
            .json(response)
    }})
} else {
    console.log("Required Data is Missing !!!!!!!!!");
    res
        .status(400)
        .json({
            message: "Required Data is Missing"
        })
    
}};

