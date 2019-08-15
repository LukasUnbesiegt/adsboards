const mongoose = require('mongoose');
const Schema = mongoose.Schema;








const advertiserSchema = new Schema({


    company: {
        type: String
    },
    phone: [{ type: Number }],
    email: [{ type: String }],
    address: {
        line1: String,
        line2: String,
        region: String,
        country: String
    },


    payment: {
        credit: {
            type: Number,
            default: 0
        }
    },


    advertisements: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Advert'
    }],

    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

})







const Advertiser = mongoose.model('Advertiser', advertiserSchema);
module.exports = {
    Advertiser
}
