'use strict'

// Config for env-vars.
const config = require('config');

// Database initialization.
const db = require('./database/db');
db.init(config.get('dbConfig'));

// External imports for the server.
const cors = require('cors');
const express = require('express');
const app = express();
  
// Sets up the server to listen on the port with CORS access for the localhost.
let port = config.get('expressServer.port');
let corsOptions = {
    origin: config.get('client.host') + ':' + config.get('client.port'),
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));
// Setting a 50mb limit for now because we need larger sizes for base64 image requests.
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.get('client.host') + ':' + config.get('client.port'));
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.listen(port, () => {
    console.log(`BetterConnect-Backend server running on port: ${port}`);
});

const router = require('./router/router')(app);