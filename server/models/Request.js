const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const requestSchema = new Schema({

    from: {
        type: Date
    },
    to: {
        type: Date
    },

    advert: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Advert'
    },
    board: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Board'
    },
    advertiser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Advertiser'
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Owner'
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },





})



const Request = mongoose.model('Request', requestSchema);

module.exports = {
    Request
}

