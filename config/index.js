// For Mlab.....................

const port = 3000;
const host = '127.0.0.1';
const dbuser = "debasish";
const dbpwd = "hello2";
const dbUrl = 'mongodb://ds117773.mlab.com:17773/mean-hotel';
const secretKey = "Hello";
// const dbUrl = MongoClient.connect('mongodb://adminUser:adminuser@192.168.1.36:27017/admin',{useNewUrlParser:true });
// const DBUSER = 'adminUser';
// const DBPASSWD = 'adminuser';
module.exports = {
  PORT: port,
  HOST: host,
  DBURL: dbUrl,
  AUTHSRC: 'mean-hotel',
  DBUSER: dbuser,
  DBPWD: dbpwd,
  secretKey: secretKey
};




// // For localhost...................

// const port = 3000;
// const host = '127.0.0.1';
// const dbuser = "go";
// const dbpwd = "fuckurself";
// const dbUrl = 'mongodb://127.0.0.1:27017/meanHotel';
// const secretKey = "Hello";
// // const dbUrl = MongoClient.connect('mongodb://adminUser:adminuser@192.168.1.36:27017/admin',{useNewUrlParser:true });
// // const DBUSER = 'adminUser';
// // const DBPASSWD = 'adminuser';
// module.exports={
//   PORT:port,
//   HOST:host,
//   DBURL:dbUrl,
//   AUTHSRC:'admin',
//   DBUSER:dbuser,
//   DBPWD:dbpwd,
//   secretKey:secretKey
// };