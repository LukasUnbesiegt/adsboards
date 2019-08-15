const { Owner } = require('../../models/owners/Owner')
const { User } = require('../../models/User')
const { Schedule } = require('../../models/Schedule')
const { Advertiser } = require('../../models/advertisers/Advertiser')
const { Advert } = require('../../models/advertisers/advert/Advert')
const moment = require('moment')

const rejectRequest = (req, res) => {

    const { schedule } = req.body;

    Schedule.findByIdAndUpdate(schedule._id, { $set: { rejected: true } }, { new: true }, (err, updated) => {

        res.status(200).send({
            success: true
        })



    })


}
const acceptRequest = (req, res) => {


    const { schedule, owner } = req.body;
    const stripeSecret = owner.stripe.secretId || `sk_test_Od5tYv3QUacconSqRLrnEOdY`
    const stripe = require('stripe')(stripeSecret);

    Schedule.findByIdAndUpdate(schedule._id, { $set: { isAccepted: true } }, { new: true }, (err, updatedSchedule) => {

        stripe.tokens.create({
            card: {
                number: '4242424242424242',
                exp_month: 12,
                exp_year: 2020,
                cvc: '123'
            }
        }, function (err, token) {

            let paymentObj = {
                description: 'income board',
                source: token.id,
                currency: 'USD',
                amount: schedule.board.price.normal * 100
            }

            stripe.charges.create(paymentObj, (err, charge) => {

                if (err) {
                    console.log(err)
                    errors.failPayment = 'something wrong in accepting request'
                    res.status(500).send({
                        success: false,
                        errors: errors

                    })

                } else {
                    const totalPrice = moment(schedule.to).diff(moment(schedule.from), 'days') * schedule.board.price.normal
                    console.log('totalPrice', totalPrice)
                    Advertiser.findByIdAndUpdate(schedule.advertiser._id, { $inc: { 'payment.credit': -totalPrice } }, { new: true }, (err, updatedAdvertiser) => {

                        let invoice = {
                            advertiser: schedule.advertiser,
                            amount: totalPrice,
                            createdAt: Date.now()
                        }
                        Owner.findByIdAndUpdate(owner._id, { $push: { invoices: invoice } }, { new: true }, (err, updated) => {


                            Advert.findByIdAndUpdate(schedule.advert, { $set: { status: 'SCHEDULED' } }, { new: true }, (err) => {
                                // final response
                                res.status(200).send({
                                    success: true
                                })

                            })


                        })

                    })


                }


            })
            // asynchronously called

        });


    })



}






const getSingleOwner = (req, res) => {



    Owner.findOne({ user: req.user._id }, (err, owner) => {

        res.status(200).send({
            success: true,
            owner

        })
    })

}


const createProfile = (req, res) => {




    const { phone, email, address, ownerId, company, stripe } = req.body;

    Owner.findOneAndUpdate({ _id: ownerId }, { $set: { phone, address, email, company, stripe } }, { new: true }, (err, updated) => {
        res.status(200).send({
            success: true

        })
    })


}

const signIn = (req, res) => {

    // get data from POST method from react side
    const { email, password } = req.body;

    let errors = {}

    User.findOne({ email: email }, (err, user) => {

        if (!user) {
            // if there is no email or password . we send erorr 422 code
            errors.noUser = 'there is no such user'
            return res.status(500).send({ success: false, errors: errors })
        } else {

            // comparing password client-side sent 
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    // if password not match. we will send error back
                    errors.WrongPass = 'wrong password'
                    return res.status(500).send({ success: false, errors: errors })

                } else {
                    // now generate token for sending back to client-side
                    // so that they can set in localStorage of react app 
                    user.generateToken((err, user) => {
                        if (err) {
                            // if something wrong with generation token. will send erorr
                            errors.badToken = 'something went wrong'
                            return res.status(500).send({ success: false, errors: errors })

                        } else {

                            // finally we send token and success back
                            res.send({ success: true, token: user.token })
                        }

                    })

                }
            })
        }
    })

}


const signUp = (req, res) => {

    // get data from POST method from react side to register
    const { username, email, password, company } = req.body;


    // create new mongoose User Model 
    const user = new User({
        username: username,
        email: email,
        password: password

    })

    // Saving our user mongoose Object
    user.save((err, userDoc) => {

        // setting new Owner Model 
        const owner = new Owner({
            company: company,
            user: userDoc._id
        })


        // Saving our owner mongoose Object
        owner.save((err, ownerDoc) => {


            // successfully send back owner object
            res.status(200).send({
                success: true,
                owner: ownerDoc
            })

        })

    })




}

const ownerAuth = (req, res) => {


    // in Owner object 
    // find by user id got from client-side
    Owner.findOne({ user: req.user.id })
        .populate('user')
        .then((owner) => {

            // sending owner object and isAuth , isOwner boolean back to client-side
            res.status(200).json({
                isAuth: true,
                isOwner: true,
                owner: owner
            })

        })


}


module.exports = {
    signIn,
    signUp,
    ownerAuth,
    createProfile,
    getSingleOwner,
    acceptRequest,
    rejectRequest
}