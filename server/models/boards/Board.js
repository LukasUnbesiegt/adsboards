const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { pointSchema } = require('./Point')
const { reviewSchema } = require('./Review')


const boardSchema = new Schema({




    id: {
        type: String
    },
    name: {
        type: String
    },
    sale: {
        type: Boolean,
        default: true
    },
    price: {

        normal: {
            type: Number
        },
        promo: {
            type: Number
        }
    },
    description: {
        type: String
    },

    size: {
        width: {
            type: Number
        },
        height: {
            type: Number
        }
    }
    ,
    population: {
        type: Number
    },

    targets: [String],
    photos: {
        type: Array,
        default: []
    },

    location: {
        type: pointSchema,
        required: true
    },
    region: {
        type: String
    },
    country: {
        type: String
    },

    rating: [{
        type: Number,
        enum: [1, 2, 3, 4, 5]

    }],


    currentAd: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Advert'

    },



    requests: [{
        advert: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Advert'
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },

        requestedAt: {
            type: Date,
            default: Date.now()
        },
        advertiserId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Advertiser'
        }

    }],

    scheduledAds: [



        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Advert'
        }
    ],
    locked: {
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Owner'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})


boardSchema.index({ location: "2dsphere" })




const Board = mongoose.model('Board', boardSchema);
module.exports = {
    Board
}
