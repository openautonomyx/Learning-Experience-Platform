const express = require('express');
const router = express.Router();
const { assignJobPositions, getJobPositions } = require('../controllers/jobPositionsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/assign', protect, admin, assignJobPositions);
router.get('/:courseId', getJobPositions);

module.exports = router;