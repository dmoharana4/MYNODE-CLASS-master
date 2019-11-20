const mongoose = require('mongoose');
// require('./hotels.model');
// require('./users.model');


var bookingDetailsSchema = mongoose.Schema({
    // hotelName:{ type: Schema.Types.ObjectId, ref: 'Hotel' },
    hotelName:{
        type:String
    },
    // userName: { type: Schema.Types.ObjectId, ref: 'User' },
    userName:{
        type:String
    },
    bookingDate: {
        type:String
    },
    checkOutDate:{
        type:String
    },
    price:{
        type:Number,
    },
    days:{
        type:Number
    }
});


mongoose.model('BookingDetail',bookingDetailsSchema, 'bookingDetails');