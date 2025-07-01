const express = require('express');
const router = express.Router();

// Import Cutoff model
const { Cutoff } = require('../models/schema.js');

// Test API
router.get('/api', (req, res) => {
    res.send("Cutoff API is working");
});

// Create a cutoff record
router.post('/create', async (req, res) => {
    try {
        const { collegeName, branch, category, rank, year } = req.body;

        if (!collegeName || !branch || !category || !rank || !year) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newCutoff = await Cutoff.create({
            collegeName,
            branch,
            category,
            rank,
            year
        });

        res.status(201).json({ message: "Cutoff created", cutoff: newCutoff });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create cutoff" });
    }
});

// Get all cutoffs
router.get('/all', async (req, res) => {
    try {
        const cutoffs = await Cutoff.find();
        res.json(cutoffs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch cutoffs" });
    }
});

// Get cutoff by college or branch (optional query)
router.get('/search', async (req, res) => {
    try {
        const { collegeName, branch } = req.query;

        const query = {};
        if (collegeName) query.collegeName = collegeName;
        if (branch) query.branch = branch;

        const result = await Cutoff.find(query);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Error searching cutoff" });
    }
});

// Update cutoff by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updated = await Cutoff.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updated) return res.status(404).json({ error: "Cutoff not found" });

        res.json({ message: "Cutoff updated", cutoff: updated });
    } catch (err) {
        res.status(500).json({ error: "Error updating cutoff" });
    }
});

// Delete cutoff by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deleted = await Cutoff.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Cutoff not found" });

        res.json({ message: "Cutoff deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting cutoff" });
    }
});

module.exports = router;
