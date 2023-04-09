'use strict'

let mysql = require('mysql2');
let pool;

/**
 * Initializes the DB connection pool.
 * @param {Object} dbConfig 
 */
function init(dbConfig) {
    pool = mysql.createPool({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
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