const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const advertSchema = new Schema({

    name: {
        type: String
    },
    note: {
        type: String
    },
    qrcode: {
        type: String
    },

    status: {
        type: String,
        enum: ['RUNNING', 'IDLE', 'SCHEDULED'],
        default: 'IDLE'
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    advertiser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Advertiser'
    },

    title: {
        type: String
    },
    quests: {
        type: Array,
        default: []
    },
    scheduled: [{
        board: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Board'
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        }
        ,
        qrqty: {
            type: Number,
            default: 0
        },
        leads: {
            type: Array,
            default: []
        }
    }],
    contents: new Schema({
        images: {
            type: Array,
            default: []
        },
        videos: {
            type: Array,
            default: []
        }
    })


})


advertSchema.index({ '$**': 'text' })


const Advert = mongoose.model('Advert', advertSchema);

module.exports = {
    Advert
}
