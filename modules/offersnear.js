var path        = require('path'),
    mongoose    = require('mongoose'),
    models      = require(path.resolve(__dirname, "../models/schema.js")),
    utils       = require(path.resolve(__dirname, "./utilities")),
    Offer       = models.Offer;

var addOffers = (req , res) => {   
    var placeName          = req.body.placeName;
    var latitude           = req.body.latitude;
    var longitude          = req.body.longitude;
    var offerCategory      = req.body.offerCategory;
    console.log(placeName);
    var newOffer = new Offer({
        placeName   : placeName,
        latitude    : latitude,
        longitude   : longitude,
        createdAt   : Date.now(),
        offerCategory : offerCategory
    });
    newOffer.save(function (err) {
        if (err) {
            utils.sendResponse(res, 500, false, 'Please try again later.');
        } else {
            utils.sendResponse(res, 200, true, 'offer added successfully.',{id:newOffer._id});
        }
    });
}

var getOffersByLocation = (req, res) =>{
// get all the offers near me 
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    console.log();
    // calculate the all the lat / long near me
    Offer.find({}
    , function (err, offers) {
        if (err) {
            console.log(err);
            utils.sendResponse(res, 500, false, 'Please try again later.');
        } else {
            
            var nearBy = [];
            offers.forEach(myFunction);        
            function myFunction(offer) {
              var lat = offer.latitude;
              var lon = offer.longitude;
              var Radius = 6378137; // Earth?s mean radius in meter
            //   var dLat = this.rad(lat- latitude);
            //   var dLong = this.rad(lon - longitude);
            //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            //   Math.cos(this.rad(latitude)) * Math.cos(this.rad(lat)) *
            //   Math.sin(dLong / 2) * Math.sin(dLong / 2);
            //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            //  var distance = Radius * c;
            // //converting to miles
            //  distance=distance * 0.00062137;
            //  distance=Math.round(distance,2);    
            //   if(distance < 100){
            //       nearBy.push(offer);
            //   }
            }
            var params = {
                offers: offers
            };
            utils.sendResponse(res, 200, true, '', params);
        }
    });
}
var getoffersByName = ( req, res) => {

    var placeName = req.body.placeName;
    console.log();
    // calculate the all the lat / long near me
    Offer.find({ placeName : { $regex : '.*' + placeName + '.*'}}
    , function (err, offers) {
        if (err) {
            console.log(err);
            utils.sendResponse(res, 500, false, 'Please try again later.');
        } else {
            var params = {
                offers: offers
            };
        }
        utils.sendResponse(res, 200, true, '', params);
        });
}

module.exports = {
    addOffers               : addOffers,
    getOffersByLocation     : getOffersByLocation,
    getoffersByName         : getoffersByName
};

 