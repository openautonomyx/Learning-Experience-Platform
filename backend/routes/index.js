const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./authRoutes');
const courseRoutes = require('./courseRoutes');
const badgeRoutes = require('./badgeRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/badges', badgeRoutes);

module.exports = router;