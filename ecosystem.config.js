
// pm2 config file for server setup
module.exports = {


    apps: [
        {
            name: 'mern',
            script: 'server.js',
            env: {
                NODE_ENV: 'development',
                MONGO_URI: ``,
                FACEBOOK_APP_ID: ``,
                FACEBOOK_APP_SECRET: ``,
                FRONTEND_URL: ``,
                ACCOUNTKIT_SECRET: ``,
                FBAPP_ID: `testing`
            },
            env_production: {
                NODE_ENV: 'production',
                MONGO_URI: ``,
                FACEBOOK_APP_ID: ``,
                FACEBOOK_APP_SECRET: ``,
                FRONTEND_URL: ``,
                ACCOUNTKIT_SECRET: ``,
                FBAPP_ID: ``
            }
        }


    ],


};
