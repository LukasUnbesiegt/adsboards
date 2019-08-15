const axios = require('axios')
const config = require('../config/index')

// fb account kit configs
const app_id = config.FB_APP_ID;
const app_secret = config.ACCOUNTKIT_SECRET;
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token';






exports.getAccountkitData = (code, callback) => {

    var app_access_token = ['AA', app_id, app_secret].join('|');


    axios({
        method: 'get',
        url: token_exchange_base_url,
        params: {
            grant_type: 'authorization_code',
            code: code,
            access_token: app_access_token
        }
    })

        .then((response) => {

            axios({
                method: 'get',
                url: `https://graph.accountkit.com/v1.1/me/?access_token=${response.data.access_token}`

            })
                .then((response) => {
                    console.log(response.data);
                    callback(response.data.phone.number)
                })
        })




}

