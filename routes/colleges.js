const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

// Routes
router.get('/api', collegeController.apiTest);
router.post('/create', collegeController.createCollege);
router.get('/read', collegeController.readAllColleges);
router.get('/:_id', collegeController.readCollegeById);       // ← ID route first
router.get('/name/:name', collegeController.readCollegeByName); // ← Then name route
router.put('/:_id', collegeController.updateCollege);
router.delete('/:_id', collegeController.deleteCollege);

module.exports = router;
