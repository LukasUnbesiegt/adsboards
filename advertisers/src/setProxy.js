const proxy = require('http-proxy-middleware')
const { endpoint, prodEndpoint } = require('./config')


module.exports = function (app) {
    const URL = process.env.NODE_ENV === "development" ? endpoint : prodEndpoint
    app.use(proxy('/', { target: URL }))
    app.use(proxy('/api/v1', { target: URL }))



}