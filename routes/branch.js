const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');



router.get('/api', branchController.apiTest);
router.post('/create', branchController.createBranch);
router.get('/read', branchController.getAllBranches);
router.get('/:_id', branchController.getBranchById);
router.put('/:_id', branchController.updateBranch);
router.delete('/:_id', branchController.deleteBranch);

module.exports = router;
