const express = require('express');
const router = express.Router();


const { College } = require('../models/schema.js');


router.get('/api', function(req, res) {
    res.send("College API is working");
});


router.post('/create', async function(req, res) {
    try {
        const { name, location, university, branches } = req.body;

        if (!name || !location || !university) {
            return res.status(400).json({ error: "Please provide name, location and university" });
        }

        const newCollege = await College.create({ name, location, university, branches });
        res.status(201).json({ message: "College created", college: newCollege });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create college" });
    }
});


router.get('/all', async function(req, res) {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (err) {
        res.status(500).json({ error: "Error fetching colleges" });
    }
});


router.get('/:id', async function(req, res) {
    try {
        const college = await College.findById(req.params.id);
        if (!college) return res.status(404).json({ error: "College not found" });

        res.json(college);
    } catch (err) {
        res.status(500).json({ error: "Error getting college" });
    }
});

router.put('/update/:id', async function(req, res) {
    try {
        const { name, location, university, branches } = req.body;

        const updatedCollege = await College.findByIdAndUpdate(
            req.params.id,
            { name, location, university, branches },
            { new: true, runValidators: true }
        );

        if (!updatedCollege) return res.status(404).json({ error: "College not found" });

        res.json({ message: "College updated", college: updatedCollege });
    } catch (err) {
        res.status(500).json({ error: "Error updating college" });
    }
});


router.delete('/delete/:id', async function(req, res) {
    try {
        const deleted = await College.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "College not found" });

        res.json({ message: "College deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting college" });
    }
});

module.exports = router;
