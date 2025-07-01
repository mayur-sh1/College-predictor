const express = require('express');
const router = express.Router();


const { Branch } = require('../models/schema.js');


router.get('/api', function(req, res) {
    res.send("Branch API is working");
});


router.post('/create', async function(req, res) {
    try {
        const { name, location, head } = req.body;

        if (!name || !location || !head) {
            return res.status(400).json({ error: "All fields are required (name, location, head)" });
        }

        const newBranch = await Branch.create({ name, location, head });
        res.status(201).json({ message: "Branch created", branch: newBranch });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong while creating branch" });
    }
});


router.get('/all', async function(req, res) {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch branches" });
    }
});


router.get('/:id', async function(req, res) {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) return res.status(404).json({ error: "Branch not found" });

        res.json(branch);
    } catch (err) {
        res.status(500).json({ error: "Error fetching branch" });
    }
});


router.put('/update/:id', async function(req, res) {
    try {
        const { name, location, head } = req.body;

        const updatedBranch = await Branch.findByIdAndUpdate(
            req.params.id,
            { name, location, head },
            { new: true, runValidators: true }
        );

        if (!updatedBranch) return res.status(404).json({ error: "Branch not found" });

        res.json({ message: "Branch updated", branch: updatedBranch });
    } catch (err) {
        res.status(500).json({ error: "Error updating branch" });
    }
});


router.delete('/delete/:id', async function(req, res) {
    try {
        const deleted = await Branch.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Branch not found" });

        res.json({ message: "Branch deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting branch" });
    }
});

module.exports = router;
