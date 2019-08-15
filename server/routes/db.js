const mongoose = require('mongoose');
const config = require('../config')
var Fawn = require("fawn");




module.exports = function () {


    // initializing Fawn for future multiple transactions
    Fawn.init(mongoose);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);


    // database connecting....
    mongoose.connect(config.MONGO_URI, { useNewUrlParser: true })
        .then(() => { console.log('mongodb running') })
        .catch((err) => { console.log('cannot connect to mongoDB') })


}