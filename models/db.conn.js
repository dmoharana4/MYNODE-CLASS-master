const mongoose = require('mongoose');
const CONFIG = require('../config');
require('./hotels.model');
require('./users.model');
require('./bookingDetails.model');


const options = {
  user : CONFIG.DBUSER,
  pass : CONFIG.DBPWD,
  authSource : CONFIG.AUTHSRC,
  useNewUrlParser: true
}
//connecting to db
mongoose.connect(CONFIG.DBURL,options);
//adding CONFIG.DBURL to an object by name _conn
var _conn= mongoose.connection;
// console.log(_conn);
//using _conn object we are creating eventlistener using on(listener Always /listens) method...
_conn.on('error',function(error){
  console.error('Connection Failed To DB!');
 console.log(error);
 
  });
  //Using once(listener only once)
_conn.once('open',function(){
  console.log("Moongoose Connection Successful!!");
});
//Code Optimization-Shorter Code
//grace full shutdown
function graceFullShutdown(signal,callback){
  _conn.close(()=>{
    console.log(`Server Termination Due to ${signal} in Mongoose!`);
    callback();
});
}
process.on('SIGINT',()=>{
  graceFullShutdown('SIGINT',function(){
    process.exit(0);
  });
});
// process.on('SIGTERM',()=>{
//   graceFullShutdown('SIGTERM',function(){
//     process.exit(0);
//   })
// })
// process.on('SIGUSR2',()=>{
//   graceFullShutdown('SIGUSR2',function(){
//       process.kill(process.pid,'SIGUSR2')
//   })
// })
// process.on('SIGINT',()=>{
//   _conn.close();
//   console.log("Server Termination Due to SIGINT!");
//   process.exit(0);
//
// });
// process.once('SIGTERM',()=>{
// mongoose.connection.close(()=>{
//   // _conn.close();
//   console.log("Server Termination Due to SIGTERM!");
//   process.exit(0);
// });
//
// });
// process.once('SIGUSR2',()=>{
//   _conn.close(function(){
//     console.log("Server Termination Due to SIGUSR2!");
//     console.log(process.pid);
//     process.kill(process.pid);
//   process.exit(0);
//   });
// })
