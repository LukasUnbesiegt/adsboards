
const { User } = require('../../models/User')
const { Advertiser } = require('../../models/advertisers/Advertiser')




const signup = (req, res) => {


    const { username, email, password, company } = req.body;


    const user = new User({
        username: username,
        email: email,
        password: password

    })


    user.save((err, userDoc) => {


        const advertiser = new Advertiser({
            company: company,
            user: userDoc._id
        })

        advertiser.save((err, advertiserDoc) => {

            res.status(200).send({
                success: true,
                advertiser: advertiserDoc
            })

        })

    })




}


const login = (req, res) => {

    const { email, password } = req.body;

    let errors = {}

    User.findOne({ email: email }, (err, user) => {

        if (!user) {
            errors.noUser = 'there is no such user'
            return res.status(500).send({ success: false, errors: errors })

        } else {

            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    errors.WrongPass = 'wrong password'
                    return res.status(500).send({ success: false, errors: errors })


                } else {

                    user.generateToken((err, user) => {
                        if (err) {

                            errors.badToken = 'something went wrong'
                            return res.status(500).send({ success: false, errors: errors })

                        } else {

                            res.send({ success: true, token: user.token })
                        }

                    })

                }




            })


        }
    })




}


const advertiserAuth = (req, res) => {

    Advertiser.findOne({ user: req.user.id })
        .populate('user')
        .then((advertiser) => {
            res.status(200).json({
                isAuth: true,
                isOwner: true,
                advertiser: advertiser
            })

        })



}

module.exports = {
    login,
    signup,
    advertiserAuth
}