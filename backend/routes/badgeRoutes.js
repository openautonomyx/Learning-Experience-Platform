const express = require('express');\const router = express.Router();
const { issueBadge, verifyBadge, getUserBadges } = require('../controllers/badgeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/issue', protect, issueBadge);
router.patch('/:id/verify', protect, admin, verifyBadge);
router.get('/user/:id', protect, getUserBadges);

module.exports = router;