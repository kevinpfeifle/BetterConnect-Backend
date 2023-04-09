'use strict'

// External import for express routing.
const router = require('express').Router();

// Internal imports for our models.
const redirectModels = require('./models/redirect');

/**
 * Formats the various URL pieces from the DB into a functional URL.
 * @param {Object} urlFragments 
 * @returns {String} the assembled and formatted URL.
 */
function formatRedirectionURL(urlFragments) {
    let host = urlFragments.protocol_type.toLowerCase() + '://' + urlFragments.redirect_host;
    let port = (urlFragments.port != null) ? ':' + urlFragments.port : '';
    let path = (urlFragments.path != null) ? urlFragments.path : '/';
    let queryString = (urlFragments.query_string != null) ?  '?' + urlFragments.query_string : '';
    return (host + port + path + queryString);
}

// The base route for redirectmanagement/redirect.
router.get('/', (req, res) => {
    let resJson = {
        'status': 'failure',
        'message': 'Access denied',
        'data': []
    };
    if (req.query != null && req.query.cardid != null) {
        redirectModels.getRedirectionForCardId(req.query.cardid).then((results) => {
            if (results != null) {
                let redirectURL = formatRedirectionURL(results);
                resJson.status = 'success';
                resJson.message = 'Data retrieved';
                resJson.data = {
                    redirectURL: redirectURL
                };
                res.status(200).json(resJson);
            } else {
                // No Data.
                resJson.message = 'No redirection exists, for cardid ' + req.query.cardid;
                res.status(404).send(resJson);
            }
        }).catch((err) => {
            resJson.message = 'Error encountered fetching redirection information';
            resJson.error = err;
            res.status(500).json(resJson);
        });
    } else {
        // Give no data back. Request malformed.
        resJson.message = 'Required parameters are missing';
        res.status(400).json(resJson);
    }
});

module.exports = router;