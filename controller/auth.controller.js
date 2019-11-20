const mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt =require('bcrypt');
const CONFIG = require('../config')
var jwt = require('jsonwebtoken')

// const log4js = require('log4js');
// log4js.configure('./config/log4js.json')
// var userlog = log4js.getLogger('user');
// var accesslog = log4js.getLogger('access');
// var errorlog = log4js.getLogger('error');


// Show users DataCue....................
module.exports.getUsersData = (req , res , next)=>{

User
    .find()
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


//Register..............................
module.exports.registration = (req , res , next)=>{
    // accesslog.info("Registration Hit /register");
    console.log("Register");
    if (!req.body || !req.body.name || !req.body.email || !req.body.password || !req.body.phoneNumber) {
        
        res
            .status(404)
            .json({
                message:"Failed to Register a user , Required fields are missing"
            })
    }else{
        const saltRounds = 10 ;
       var hashPassword = bcrypt.hashSync(req.body.password,saltRounds);


// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

       var newUser = new User({
           name:req.body.name,
           type:req.body.type,
           email:req.body.email,
           password:hashPassword,
           address:req.body.address,
           phoneNumber:req.body.phoneNumber,
           activeStatus:req.body.activeStatus,
           gender:req.body.gender,
           regDate:req.body.regDate,
           lastLoginDate:req.body.lastLoginDate
       });
       newUser.save((err,dbResponse)=>{
           if (err) {
               res 
                    .status(500)
                    .json({message:"Failed to register a user"})
                    // errorlog.error({error:err ,message:"Failed to register a user"} )
           }else{
            //    jwt.sign(header,payload,signature)
           let token = jwt.sign({_id:dbResponse._id},CONFIG.secretKey,{expiresIn:3600});


               res
                .status(200)
                .json({user:dbResponse,message:"Registration Successful.......",auth:true,token:token})
               
           }
       })
            
    }
};

//LogIn .......................
module.exports.login = (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        res
            .status(400)
            .json({
                payload:{message:"Email and Password cannot be empty",auth:false}
            })
    }else{
        User.findOne({email:req.body.email},(err,dbResponse)=>{
            if (err) {
                res
            .status(400)
            .json({
                payload:{message:"Internal Server Error",auth:false}
            })
            }else{if (!dbResponse){
                res
                .status(400)
                .json({
                    payload:{message:"User Dosen't exist Get Registered",auth:false}
                })
            }else{
            var isPwd =  bcrypt.compareSync(req.body.password,dbResponse.password);
            // var isPwd = user.password;
            if (!isPwd) {
                res
                .status(400)
                .json({
                    payload:{message:"Wrong Password",auth:false}
                })
              }else{
                   //    jwt.sign(header,payload,signature)
            let token = jwt.sign({_id:dbResponse._id},CONFIG.secretKey,{expiresIn:3600});
                        
                res
                .status(200)
                .json({
                    payload:{message:"Login Successfull",token:token,auth:true}
                })
              }
            }
        
        
        }
        })
    }
};


//Change Password..............................................
module.exports.changePassword = (req , res , next)=>{

    console.log("Change Password");
    var userId = req.params.userId;

    if (userId) {
        const saltRounds = 10 ;
        var hashPassword = bcrypt.hashSync(req.body.password,saltRounds);
        var newPassword = {$set:{"password":hashPassword}};
        User.findByIdAndUpdate(userId , newPassword , (err,dbResponse)=> {

 if (err) {
     
     res 
        .status(500)
        .json({
            payload:{
                message:"Password change Failed",
                error : err
            }
        })
     
 }else{
     res.status(200).json({
        payload:{
            message:"Password changed Successfully",
            }
    })
 }} )}    else {

    res
    .status(500)
    .json({
    payload:{
        message:"User Not Found",
        }
 })
    
    }};


    // Validate token..............................................
    module.exports.validateToken = (req,res,next)=>{
        var token = req.headers['x-access-token'];

        if (!token) {
            res
                .status(400)
                .json({payload:{
                    auth:false,
                    message:"Token not found",
                    token:null
                }})
        }else {
            
            
            jwt.verify(token,CONFIG.secretKey,(err,doc)=>{
                
                if (err) {
                    res
                        .status(401)
                        .json({
                            auth:false,
                            message:"Failed to Authenticate Token {Unauthorize}",
                            token:null
                        })
                }else{
                    console.log(doc);
                    User.findById(doc._id,(err,user)=>{
                        if (err) {
                            res
                                .status(500)
                                .json({
                                    auth:false,
                                    message:"Internal Server Error",
                                    token:null
                                })
                        } if (!user) {
                            res
                                .status(500)
                                .json({
                                    auth:false,
                                    message:"Not a valid user.... Incident wil be Reported",
                                    token:null
                                })
                        }else{
                            // res
                            // .status(200)
                            // .send(user)
                            next(); // this is used to go to next controller........ see routers
                        }
                    })
                }
            })
        }
    }