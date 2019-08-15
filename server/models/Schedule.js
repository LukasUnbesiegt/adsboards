const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const scheduleSchema = new Schema({

    isAccepted: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    },
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



    stats: {
        qrqty: {
            type: Number,
            default: 0
        },
        leads: {
            type: Array,
            default: []
        }
    },

    chats: [{
        message: {
            type: String
        },
        sender: {
            type: String
        }

    }]



}, { timestamps: true })


scheduleSchema.index({ '$**': 'text' })

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = {
    Schedule
}

