'use strict'

/**
 * Routes our express server to the created service routers for sub-routing.
 * @param {Object} app the express server created for our backend 
 */
module.exports = (app) => {
    app.use('/redirectmanagement', require('../controllers/redirectManagement/router/router'));
};