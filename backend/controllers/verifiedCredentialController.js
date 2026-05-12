const asyncHandler = require('express-async-handler');
const Badge = require('../models/Badge');

// @desc Issue a verified credential for a professional course
// @route POST /api/credentials/issue
// @access Private (admin/instructor)
const issueVerifiedCredential = asyncHandler(async (req, res) => {
  const { userId, course, credentialId } = req.body;

  if(!userId || !course || !credentialId) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  const credential = await Badge.create({
    title: course,
    recipient: userId,
    criteriaUrl: `https://lxp.example.com/credentials/${credentialId}`,
    issuer: 'LXP Platform',
    verified: true,
    dateAwarded: new Date()
  });

  res.status(201).json({
    message: 'Verified credential issued successfully',
    credential
  });
});

module.exports = { issueVerifiedCredential };