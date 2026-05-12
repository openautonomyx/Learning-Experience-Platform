const asyncHandler = require('express-async-handler');
const Badge = require('../models/Badge');
const User = require('../models/User');

// @desc Issue a badge to a user
// @route POST /api/badges/issue
// @access Private (instructor/admin)
const issueBadge = asyncHandler(async (req, res) => {
  const { title, description, criteriaUrl, recipientId } = req.body;
  const recipient = await User.findById(recipientId);
  if(!recipient){
    res.status(404);
    throw new Error('Recipient not found');
  }
  const badge = await Badge.create({
    title,
    description,
    criteriaUrl,
    recipient: recipient._id,
    verified: false
  });
  res.status(201).json(badge);
});

// @desc Verify a badge
// @route PATCH /api/badges/:id/verify
// @access Private (admin)
const verifyBadge = asyncHandler(async (req, res) => {
  const badge = await Badge.findById(req.params.id);
  if(!badge){
    res.status(404);
    throw new Error('Badge not found');
  }
  badge.verified = true;
  await badge.save();
  res.json(badge);
});

// @desc Get all badges for a user
// @route GET /api/badges/user/:id
// @access Private
const getUserBadges = asyncHandler(async (req, res) => {
  const badges = await Badge.find({ recipient: req.params.id });
  res.json(badges);
});

module.exports = { issueBadge, verifyBadge, getUserBadges };