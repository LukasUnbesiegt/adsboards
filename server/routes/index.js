
const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');
const cors = require('cors')

// API routes
const userRoutes = require('./api/user')
const advertisersRoutes = require('./api/advertisers/advertisers')
const ownersRoutes = require('./api/boards/owner')
const boardsRoutes = require('./api/boards/boards')
const schedulesRoutes = require('./api/schedules')
const chatsRoutes = require('./api/chat')
module.exports = function (app) {


    var whitelist = ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'https://www.spotads.live', 'https://owner.spotads.live', 'https://advertiser.spotads.live']
    var corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true
    }

    var corsOptionsDelegate = function (req, callback) {
        var corsOptions;
        if (whitelist.indexOf(req.header('Origin')) !== -1) {
            corsOptions = { origin: true, credentials: true } // reflect (enable) the requested origin in the CORS response
        } else {
            corsOptions = { origin: false, credentials: true } // disable CORS for this request
        }
        callback(null, corsOptions) // callback expects two parameters: error and options
    }


    // parsing json from request
    app.use(express.json())


    app.use(express.urlencoded({ extended: true }))

    // parsing cookies from request -  we don't use cookies in spotads though
    app.use(cookieParser());

    // CORS handling in our app
    app.use(cors(corsOptionsDelegate))


    // app.options('*', cors(corsOptions))


    // users api route for all handling associated with users
    app.use('/api/v1/users', userRoutes)

    // advertisers api route for all handling associated with advertisers
    app.use('/api/v1/advertisers', advertisersRoutes)

    // owners api route for all handling associated with owners
    app.use('/api/v1/owners', ownersRoutes)


    // scheules api route for all handling associated with schedules
    app.use('/api/v1/schedules', schedulesRoutes)


    // boards api route for all handling associated with boards
    // CRUD for board , getting single board 
    app.use('/api/v1/boards', boardsRoutes)

    // chat system endpoint

    app.use('/api/v1/chats', chatsRoutes)

}