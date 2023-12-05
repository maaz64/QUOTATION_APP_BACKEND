const express = require('express');
const router =  express.Router();
const {homeQuoatation} = require('../controller/userController');

router.use('/users',require('./user'));
router.get('/',homeQuoatation);

module.exports = router;