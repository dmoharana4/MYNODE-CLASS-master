var mongoose = require('mongoose');

let BookingDetail = mongoose.model('BookingDetail');

module.exports.addHotelBookingData = (req , res , next)=>{
 console.log("Book Hotel");
 
   
    // findById(req.params.bookingId)
        // .populate('User')
        if (req.body) {
            var bookHotel = new BookingDetail(req.body);
            bookHotel.save((err,dbResponse)=>{

                if (err) {
                    res.status(500)
                      .json({message: "Hotel booking Failed",error:err});
                  }else{
                    res.status(200)
                    .json(dbResponse);
                  }
            })
        }else {
            console.log('Required Data is missing..!!');
            res.status(400).json({message: 'Required Data is missing..!!'})
}};

module.exports.getHotelBookingData = (req,res,next)=>{
    var query = req.query;

    BookingDetail.
     find(query)
     .exec(function(err, dbResponse){
        if (err) {
            console.log(err);
            res
              .status(200)
              .json({
                error: err,
                message: 'Unable to fetch Records'
              })
          } else {
            console.log(dbResponse.length);
            res
              .status(200)
              .json(dbResponse);
          }

     }) //exec

}