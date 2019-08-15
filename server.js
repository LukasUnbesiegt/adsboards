const express = require('express');
const http = require('http')
const path = require('path')


// *** express server initialization ***
const app = express();

// getting  third party  and api middlewares and routes 
require('./server/routes/index')(app);
require('./server/routes/db')();

//Static file declaration
//production mode


//

app.get('*', (req, res) => {
    res.json({ success: 'API server for spot ads' })
})

const PORT = 5000 || process.env.PORT;

app.listen(process.env.PORT || 5000, () => {
    console.log('server is listening in port 5000')
}) 