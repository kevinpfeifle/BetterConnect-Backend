'use strict'

let mysql = require('mysql2');
let pool;

/**
 * Initializes the DB connection pool.
 */
function init() {
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000
    });
}

/**
 * Obtains a connection to the DB from the pool, and executes a query with it.
 * @param {String} query 
 * @param {Array} params
 * @returns {Object} results of the query
 */
function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) throw(err);
            connection.query(query, params, (err, results, fields) => {
                connection.release();
                if (err) reject(err);
                resolve(results);
            })
        })
    });
}

module.exports = {
    init: init,
    executeQuery: executeQuery
};