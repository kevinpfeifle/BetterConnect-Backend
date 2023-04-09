'use strict'

const db = require('../../../database/db');
const queries = require('./queries');

/**
 * For a given cardId, return all the redirection details.
 * @param {String} cardId 
 * @returns {Object} the redirection details for the cardId
 */
function getRedirectionForCardId(cardId) {
    return new Promise((resolve, reject) => {
        let query = queries.getRedirectionForCardId;
        db.executeQuery(query, [cardId]).then((results) => {
            resolve(results[0]);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

module.exports = {
    getRedirectionForCardId: getRedirectionForCardId
};