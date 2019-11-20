const MongoClient = require('mongodb').MongoClient;
const CONFIG = require('../config');
// const dbUrl = 'mongodb://adminUser:adminuser@192.168.1.36:27017/admin'
var connection = null;
function open(){
  MongoClient.connect(CONFIG.DBURL,{authSource:CONFIG.AUTHSRC},
  function(error,client){
    if(error){
      console.log('Error in DB connection!');
      console.log(error);
    }else {
      connection = client;
      console.log('Connection Sucessful!');
    }
  });
}
function get(){
  return connection;
}
// console.log(process);
// process.on('SIGINT',()=>{
//   connection.close();
//   console.log("Server Termination Due to SIGINT!");
//   process.exit(0);
//
// })
// process.once('SIGTERM'()=>{
//   connection.close();
//   console.log("Server Termination Due to SIGTERM!");
//   process.exit(0);
// })
// process.once('SIGUSR2'()=>{
//   connection.close();
//   console.log("Server Termination Due to SIGUSR2!");
//   console.log(process.pid);
//   process.kill(process.pid);
// process.exit(0);
// })

module.exports = {
  open:open,
  get:get
};
