'use strict'

const router = require('express').Router();

// Routes calls to redirectmanagement to their specified route based on the endpoint passed in the request.
router.use('/redirect', require('../redirect'));

module.exports = router;