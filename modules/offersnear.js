var path        = require('path'),
    mongoose    = require('mongoose'),
    models      = require(path.resolve(__dirname, "../models/schema.js")),
    utils       = require(path.resolve(__dirname, "./utilities")),
    offer       = models.Offer;

var addOffers = (req , res) => {   
    var offerId            = mongoose.Types.ObjectId();
    var placeName          = req.body.placeName;
    var latitude           = req.body.latitude;
    var longitude          = req.body.longitude;
    var offerCategory      = req.body.offerCategory;
    console.log(offerId + "" + placeName);
    var newOffer = new offer({
        offerId     : mongoose.Types.ObjectId(offerId),
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
    offer.findAll({}
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
              var radius = Math.abs(lat - lon);
              if(radius < 100){
                  nearBy.push(offer);
              }
            }
            var params = {
                offers: nearBy
            };
            utils.sendResponse(res, 200, true, '', params);
        }
    });
}
var getoffersByName = ( req, res) => {

    var placeName = req.body.placeName;
    console.log();
    // calculate the all the lat / long near me
    offer.find({ placeName : placeName}
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

 