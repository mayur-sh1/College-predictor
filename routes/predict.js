const express = require('express');
const router = express.Router();

// importing Model
const {Predict} = require('../models/schema.js')

router.get('/api', function(req, res){
    res.send("Predict API is working")
});

module.exports = router;