const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');

router.get('/api', predictionController.apiTest);

// Student Access
router.post('/addprediction', predictionController.createPrediction);
router.get('/predict/:studentId', predictionController.getPredictionsByStudentId);

// Admin Access
router.delete('/predict/:id', predictionController.deletePrediction);

module.exports = router;
