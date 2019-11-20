require('./models/db.conn');
var express = require('express');
var app = express();
var CONFIG = require('./config');
const path = require('path');
var bodyParser = require('body-parser');

//for Log4js...................
// const log4js = require('log4js');
// log4js.configure('./config/log4js.json')
// var startUpLog = log4js.getLogger('app');
// var accesslog = log4js.getLogger('access');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Generating log Directory.........................
// try{
//   require('fs').mkdirSync('./log');
// }catch(error){
//   if (error.code != 'EEXIST') {
//     console.error("Could not setup log Directory" ,error);
//     process.exit(1);
//   }
// }

app.use(express.static(path.join(__dirname,'public')));

//parse urlencoded Data
app.use(bodyParser.urlencoded({extended:false}));
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

var homeRoutes = require('./routes');
var hotelRoutes = require('./routes/hotel.routes');
// var usersRoutes = require('./routes/users.routes');
var bookHotelRoutes = require('./routes/bookingDetails.routes')
var authUserRoutes = require('./routes/authUsers.routes');


//Adding logger to express...................
// app.use(log4js.connectLogger(log4js.getLogger('http'),{level:'auto'}))
// app.use((req,res,next)=>{
//   // console.log("Hit " + req.method + " " + req.url);
// accesslog.info("Hit " + req.method + " " + req.url);
  
// })

app.use(homeRoutes);
app.use(hotelRoutes);
// app.use(usersRoutes);
app.use(bookHotelRoutes);
app.use(authUserRoutes);



app.listen(CONFIG.PORT,CONFIG.HOST,()=>{
  // startUpLog.info('Magic happens on PORT' +CONFIG.PORT );
  // startUpLog.info('Server runs on'+CONFIG.HOST + CONFIG.PORT  );

  console.log("Server Started Bro "+"With Port Number "+CONFIG.PORT+" on Host "+CONFIG.HOST);
});
