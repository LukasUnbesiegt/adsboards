
const { Advert } = require('../../models/advertisers/advert/Advert')
const { Advertiser } = require('../../models/advertisers/Advertiser')
const { Schedule } = require('../../models/Schedule')
const stripe = require('stripe')('sk_test_Od5tYv3QUacconSqRLrnEOdY');





const getSpotsListsByAds = (req, res) => {



    // initialize empty error object
    let errors = {}


    // get advertId from request - client side
    const { advertId } = req.body;



    // finding schedules which advert id match with advertId sent from client-side
    Schedule.find({ advert: advertId })
        .populate('board')
        .then((schedules) => {

            // sending back schedules matched to client-side and success
            res.status(200).send({
                success: true,
                schedules: schedules
            })

        })






}

// credits top-up function for advertiser - for usage of booking spots
const stripeCheckOut = (req, res) => {

    // initialize empty error object
    let errors = {}
    // getting data to use from request ( client side)
    const {
        description,
        source,
        currency = 'USD',
        amount,
        advertiserId
    } = req.body;

    // stripe library method for creating invoice - charging
    // we need description , source ( id getting from client-side) , curreny and amount of top up
    let roundedAmount = Math.round(amount) / 100;
    stripe.charges.create({ description, source, currency, amount: roundedAmount }, (err, charge) => {

        if (err) {

            // if something wrong in process. we will notify back to client-side that payment or topup failed
            errors.failPayment = 'Credit Card Payment Fail'
            res.status(500).send({
                success: false,
                errors: errors
            })

        } else {

            // payment was success and now we need to update advertiser credit in its Advertiser Model 
            // $inc use for increasing payment.credits object which we use to store credits

            Advertiser.findByIdAndUpdate(advertiserId, { $inc: { 'payment.credit': roundedAmount } }, { new: true }, (err, updatedAdvertiser) => {

                res.status(200).send({
                    success: true
                })
            })

        }
    })
}




const getSingleAdvertiser = (req, res) => {


    // finding single advertiser from Advertiser Model 
    // using user id from auth middleware which use for private route
    Advertiser.findOne({ user: req.user.id })
        .populate('user')
        .then((advertiser) => {
            // sending back advertiser matched to client-side and success
            res.status(200).json({
                success: true,
                advertiser: advertiser
            })

        })




}
const createProfile = (req, res) => {


    const { phone, email, address, advertiserId, company } = req.body;
    console.log(advertiserId)
    console.log(req.body)
    Advertiser.findOneAndUpdate({ _id: advertiserId }, { $set: { phone, address, email, company } }, { new: true }, (err, updated) => {
        res.status(200).send({
            success: true

        })
    })


}

const editAdvert = (req, res) => {

    // getting advertId and advert from request client side
    const { advertId, advert } = req.body;


    // finding  advert from Advert Model  and update with advert object from client side

    Advert.findOneAndUpdate({ _id: advertId }, { $set: { ...advert } }, { new: true }, (err, updatedAdvert) => {
        // sending back success response to client side
        res.status(200).send({
            success: true

        })

    })




}

const deleteAdvert = (req, res) => {
    // getting advertId from request client side
    const { advertId } = req.params;

    // finding  advert from Advert Model  and delete that advert object 
    Advert.findByIdAndDelete(advertId, (err, deleted) => {
        // sending back success response to client side
        res.status(200).send({
            success: true

        })


    })




}
const getSingleAdvert = (req, res) => {

    // get advertId from client-side
    const { advertId } = req.params;


    // finding single advert from Advert Model 
    // using advert id and find matched advert
    Advert.findOne({ _id: advertId }, (err, advert) => {

        // sending back advert matched to client-side and success
        res.status(200).send({
            success: true,
            advert: advert

        })


    })

}



const createAdvert = (req, res) => {


    // getting all data neccessary for creation of advert
    const { name, note, qrcode, title, quests, contents, advertiser } = req.body;


    // initialize newAdvert object as Advert mongoose Model
    const newAdvert = new Advert({
        name,
        note,
        qrcode,
        title,
        quests,
        contents,
        advertiser

    })


    // saving newAdvert object 
    newAdvert.save((err, advertSaved) => {

        // and sending back to client-side . created advert and success response
        res.status(200).send({
            success: true,
            advert: advertSaved
        })

    })



}


// GETTING ALL ADVERTS from advertiser id
const getAdverts = async function (req, res) {

    // filters object sent by client-side
    const { filters } = req.body;
    // we limit items for 10 per page
    let ITEMS_PER_PAGE = 10;
    //current page number
    let page = req.body.page || 1;

    let totalItems;
    // query object - intially empty 
    let findArgs;
    let advertiser;
    // advertiser id which will use for finding adverts by that advertiser
    advertiser = await Advertiser.findOne({ user: req.user._id }, (err, advertiser) => {
        return advertiser.user
    })

    findArgs = {
        advertiser: advertiser
    };

    // dynamic filtering
    for (let key in filters) {
        // looping through all filters and set for each property
        if (filters.hasOwnProperty(key)) {
            const element = filters[key];
            switch (key) {

                default:
                    findArgs[key] = element;
                    break;
            }

        }
    }

    // now we query adverts with findArgs with filters filled object .skip is skipping and limit is limiting adverts quantity we need
    Advert
        .countDocuments()
        .then((count) => {

            totalItems = count
            return Advert
                .find(findArgs)
                .populate('advertiser')
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)

        })
        .then((adverts) => {
            // now sending back all adverts and pagination items 

            res.status(200).json({
                success: true,
                totalItems: adverts.length,
                adverts: adverts,
                currentPage: page,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
                hasPreviousPage: page > 1,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems
            })
        })
}

module.exports = {
    createAdvert,
    getAdverts,
    deleteAdvert,
    editAdvert,
    getSingleAdvert,
    createProfile,
    getSingleAdvertiser,
    stripeCheckOut,
    getSpotsListsByAds
}