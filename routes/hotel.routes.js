var express = require('express');
var router = express.Router();
const hotelCtrl = require('../controller/hotels.controller');
const authCtrl = require('../controller/auth.controller');


router
.route('/hotels')
.get(hotelCtrl.getHotelsData);

router
.route('/hotels/new')
.post(hotelCtrl.addHotelNew);

router
.route('/hotels/:hotelId')
.get(hotelCtrl.getHotelData);

router
.route('/hotels/:hotelId/reviews')
.get(hotelCtrl.getHotelReviews);
// .put(hotelCtrl.addHotelReviews);

module.exports = router;
