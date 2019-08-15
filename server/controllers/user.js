const { User } = require('../models/User');
const { sendEmailHelper } = require('../services/mail')

const resetPassword = (req, res) => {

    console.log(req.body.resetToken)
    User.findOne({
        resetToken: req.body.resetToken

    }, (err, user) => {
        if (!user) {
            return res.status(500).send({ success: false, message: 'Sorry, token bad, generate a new one.' })

        } else {
            user.password = req.body.password;
            user.resetToken = '';
            user.save((err, doc) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({
                    success: true
                })
            })
        }


    })
}

const resetUser = (req, res) => {

    // find  a user with email
    // generate reset token for user instance
    // send email with that user object 
    // 200 success response
    User.findOne(
        { 'email': req.body.email },
        (err, user) => {

            if (user) {
                user.generateResetToken((err, user) => {
                    if (err) return res.status(500).send({ success: false })
                    sendEmailHelper(user.email, user.email, user)
                    return res.status(200).send({ success: true })
                    console.log(user)
                })

            } else {
                return res.status(500).send({ success: false, message: 'no user found' })
            }

        }
    )



}



const editUser = function (req, res) {


    User.findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true }, (err, user) => {


        res.status(200).send({
            success: true
        })
    })




}





const register = function (req, res) {


    // get data from POST method from react side
    let { email, password, username } = req.body;


    if (!email || !password) {
        // if there is no email or password . we send erorr 422 code
        return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email and password!' }] });
    }



    // create new mongoose User Model 
    const user = new User({

        local: {
            username: username,
            email: email,
            password: password
        }

    })



    // Saving our user mongoose Object
    user.save((err, userDoc) => {
        if (err) { return res.json({ success: false, errors: {} }) }

        // notify back to client-side as operation api request is success
        res.status(200).json({ success: true })

    })
}






// user login method - same for both advertiser and owner

const login = function (req, res) {



    // find user which match email coming from request with 'local.email' in dataabse.
    User.findOne({ 'local.email': req.body.email }, (err, user) => {
        if (!user) {
            // if there is no user - send error
            return res.json({ loginSuccess: false, message: 'Auth Failed , user not found ' })
        }


        // if there is user - compare password of request using comparePassword method which we wrote in mongoose model
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                // is password not match - throw error
                return res.json({ loginSuccess: false, message: 'Wrong password' })
            }


            // if password match , generate token to send to client-side back
            user.generateToken((err, user) => {
                if (err) { return res.status(400).send(err) }
                // sending token back to client-side
                res.send({ loginSuccess: true, token: user.token })

            })

        })


    })



}


const fbLogin = function (req, res) {

    const { email, name, accessToken } = req.body;

    // TO-DO
    // what if user change email in facebook ?? 
    // check accessToken and it matches but no email , we would replace token and give access to it .



    User.findOne({ 'facebook.email': email }, (err, user) => {

        if (!user) {
            const user = new User({

                facebook: {
                    username: name,
                    email: email,
                    accessToken: accessToken
                }

            })

            user.save((err, userDoc) => {
                if (err) { return res.json({ success: false, errors: normailizeErrors(err.errors) }) }

                // res.status(500).json({ success: true })
                userDoc.generateToken((err, user) => {


                    if (err) {
                        return res.status(400).send(err)
                    }


                    res.send({ loginSuccess: true, token: user.token })

                })
            })
        } else {
            res.send({ loginSuccess: true, token: user.token })
        }









    })

}



const auth = function (req, res) {


    if (!req.user.facebook) {
        res.status(200).json({
            email: req.user.local.email,
            username: req.user.local.username,
            isAuth: true,
            authType: 'local',
            role: req.user.role


        })

    } else {

        res.status(200).json({
            email: req.user.facebook.email,
            username: req.user.facebook.username,
            isAuth: true,
            authType: 'facebook',
            role: req.user.role


        })
    }





}


const logout = function (req, res) {

    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, updateUser) => {

        // when client-side request 'logout' api route. we find user with that id
        // they sent and clear token in db and send succcess

        if (err) { return res.json({ success: false, err }) }
        return res.status(200).send({
            success: true
        })
        console.log('success')

    })




}


module.exports = {
    logout,
    auth,
    fbLogin,
    register,
    login,
    editUser,
    resetUser,
    resetPassword

}