const express = require('express');
const router = express.Router();
const { issueVerifiedCredential } = require('../controllers/verifiedCredentialController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/issue', protect, admin, issueVerifiedCredential);

module.exports = router;