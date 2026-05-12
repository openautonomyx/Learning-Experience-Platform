const express = require('express');
const router = express.Router();
const { assignSFIA, getSFIAForCourse } = require('../controllers/sfiaSkillsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/assign', protect, admin, assignSFIA);
router.get('/:courseId', getSFIAForCourse);

module.exports = router;