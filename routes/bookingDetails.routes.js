var express = require('express');
var router = express.Router();
const bookCtrl = require('../controller/bookingDetails.controller');



router 
.route('/book')
.get(bookCtrl.getHotelBookingData)
.post(bookCtrl.addHotelBookingData)



module.exports = router;