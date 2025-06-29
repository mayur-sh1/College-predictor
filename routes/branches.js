const express = require('express');
const router = express.Router();

// importing Model
const {Branch} = require('../models/schema.js')

router.get('/api', function(req, res){
    res.send("Branch API is working")
});

module.exports = router;