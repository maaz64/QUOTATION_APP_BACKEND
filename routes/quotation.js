const express = require('express');
const router = express.Router();
const passport = require('passport');
const quotationController = require('../controller/quotationController');


router.post('/new-quotes', passport.authenticate('jwt',{session:false}),quotationController.createQuotes);
router.get('/get-quotes', passport.authenticate('jwt',{session:false}),quotationController.getQuotes);
router.put('/update-quotes/:id', passport.authenticate('jwt',{session:false}),quotationController.updateQuotes);
router.delete('/delete-quotes/:id', passport.authenticate('jwt',{session:false}),quotationController.deleteQuotes);

module.exports = router;
