const { User } = require('../models/User')




// middleware we used to check when user try to access api private routes
let authMiddleware = (req, res, next) => {


    // we getting token from client-side by Authorization Header 
    let token = req.headers.authorization;



    // now we will find User by that token accessing our database
    User.findByToken(token, (err, user) => {


        // if there is  error , throw error 
        if (err) { throw err; }


        if (!user) {

            // if user is not existed . send error back 400 http status
            return res.status(400).json({
                isAuth: false,
                error: true
            })
        }

        // if there is user. 
        // attach token and usr to user Object

        req.token = token;
        req.user = user;

        // all finish and pass this middleware and go out  calling next()
        next();


    })

}

module.exports = { authMiddleware }