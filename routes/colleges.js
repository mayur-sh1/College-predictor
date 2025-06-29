const express = require('express');
const router = express.Router();

// importing Model
const {College} = require('../models/schema.js')

router.get('/api', function(req, res){
    res.send("College API is working")
});

module.exports = router;