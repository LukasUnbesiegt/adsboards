const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const ownerSchema = new Schema({


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

    total: {
        type: Number,
        default: 0
    },
    invoices: {
        type: Array,
        default: []
    },
    stripe: {
        publicId: String,
        secretId: String
    },

    paypal: {
        publicId: String,
        secretId: String
    },


    boards: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Board'
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







const Owner = mongoose.model('Owner', ownerSchema);
module.exports = {
    Owner
}
