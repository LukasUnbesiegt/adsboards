const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');




const userSchema = new Schema({



    username: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String
    },

    password: {
        type: String
    },

    token: {
        type: String
    },
    resetToken: {
        type: String
    },





})



// mongoose pre hook . 
userSchema.pre('save', function (next) {

    // when we find user and try to edit password. 
    var user = this;

    if (user.isModified('password')) {

        // isModified method is used to check if password is changed or modify , if yes , we will use bcrypt to hash our password
        // when we find user and try to edit password. 
        bcrypt.genSalt(10, function (err, salt) {

            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            })
        })


    } else {
        // if password is not modifed , we will skip this and call next() function 

        next();
    }

})


userSchema.methods.generateResetToken = function (cb) {

    var user = this;

    crypto.randomBytes(20, (err, buffer) => {

        const token = buffer.toString('hex')
        user.resetToken = token;
        user.save((err, user) => {

            if (err) {
                return err;
            } else {
                cb(null, user)
            }
        })
    })



}


// comparing password coming from req.body and if match , send isMatch value 
userSchema.methods.comparePassword = function (candidatePassword, cb) {

    var user = this;
    bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
        if (err) return cb(err);

        cb(null, isMatch);
    })

}


// generating JWT token and set to specific user instance to use or send to client
userSchema.methods.generateToken = function (cb) {

    var user = this;

    // signing jwt token for using auth 
    var token = jwt.sign(user._id.toHexString(), 'secret')
    // attach token in user object
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    })


}

// finding user by matching token 

userSchema.statics.findByToken = function (token, cb) {

    var user = this;

    // verify token coming from request and compare with user's token 
    // if match >> will receive decode >> find correct user by comparing _id with decode since we sign jwt as user._id

    jwt.verify(token, 'secret', function (err, decode) {

        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);

            cb(null, user);
        })
    })

}



const User = mongoose.model('User', userSchema);

module.exports = {
    User
}



