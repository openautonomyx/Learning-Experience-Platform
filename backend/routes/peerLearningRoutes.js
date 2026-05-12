const express = require('express');
const router = express.Router();
const { requestPeerLearning, getPeerLearningRequests, acceptPeerLearning } = require('../controllers/peerLearningController');
const { protect } = require('../middleware/authMiddleware');

router.post('/request', protect, requestPeerLearning);
router.get('/user/:userId', protect, getPeerLearningRequests);
router.patch('/:id/accept', protect, acceptPeerLearning);

module.exports = router;