const express = require('express');
const router = express.Router();
const cutoffController = require('../controllers/cutoffController');

router.get('/api', cutoffController.apiTest);

router.post('/addCutoff', cutoffController.createCutoff);
router.get('/cutoffs', cutoffController.getAllCutoffs);
router.get('/cutoffs/:id', cutoffController.getCutoffById);
router.put('/cutoffs/:id', cutoffController.updateCutoff);
router.delete('/cutoffs/:id', cutoffController.deleteCutoff);

module.exports = router;
