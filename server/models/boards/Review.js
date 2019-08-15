const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new mongoose.Schema({

    advertiser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Advertiser'
    },

    comment: {
        type: String
    },
    rating: {
        type: Number
    }

});



const Review = mongoose.model('Review', reviewSchema);
module.exports = {
    Review,
    reviewSchema
}
