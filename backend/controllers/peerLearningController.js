const asyncHandler = require('express-async-handler');
const PeerLearning = require('../models/PeerLearning');
const User = require('../models/User');

// @desc Request peer learning group session
// @route POST /api/peer-learning/request
// @access Private (students)
const requestPeerLearning = asyncHandler(async (req, res) => {
  const { requesterId, partnerId, courseId, preferredTime } = req.body;

  if (!requesterId || !partnerId || !courseId || !preferredTime) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  const session = await PeerLearning.create({
    course: courseId,
    requester: requesterId,
    partner: partnerId,
    preferredTime,
    status: 'Pending'
  });

  res.status(201).json({ message: 'Peer learning request created', session });
});

// @desc Get peer learning requests for a user
// @route GET /api/peer-learning/user/:userId
// @access Private
const getPeerLearningRequests = asyncHandler(async (req, res) => {
  const requests = await PeerLearning.find({
    $or: [{ requester: req.params.userId }, { partner: req.params.userId }]
  }).populate('requester partner course');

  res.json(requests);
});

// @desc Accept peer learning request
// @route PATCH /api/peer-learning/:id/accept
// @access Private
const acceptPeerLearning = asyncHandler(async (req, res) => {
  const session = await PeerLearning.findById(req.params.id);
  if (!session) {
    res.status(404);
    throw new Error('Peer learning session not found');
  }

  session.status = 'Accepted';
  await session.save();

  res.json({ message: 'Peer learning session accepted', session });
});

module.exports = { requestPeerLearning, getPeerLearningRequests, acceptPeerLearning };