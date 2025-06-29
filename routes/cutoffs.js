const express = require('express');
const router = express.Router();

// importing Model
const {Cutoff} = require('../models/schema.js')

router.get('/api', function(req, res){
    res.send("Cutoff API is working")
});

module.exports = router;