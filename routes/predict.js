const express = require('express');
const router = express.Router();
const { Cutoff } = require('../models/schema.js');


router.get('/api', (req, res) => {
    res.send("Predictor API is working");
});

router.post('/predict', async (req, res) => {
    try {
        const { rank, category, branch, year } = req.body;

        if (!rank || !category) {
            return res.status(400).json({ error: "Rank and category are required" });
        }

     
        const query = {
            category: category,
            rank: { $gte: rank } 
        };

        if (branch) query.branch = branch;
        if (year) query.year = year;

        const matches = await Cutoff.find(query).sort({ rank: 1 }); 

        if (matches.length === 0) {
            return res.json({ message: "No matching colleges found for your rank and category." });
        }

        res.json({
            message: "Colleges you may get:",
            total: matches.length,
            results: matches
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Prediction failed" });
    }
});

module.exports = router;
