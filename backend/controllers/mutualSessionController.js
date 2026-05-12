const asyncHandler = require('express-async-handler');
const Session = require('../models/Session');
const User = require('../models/User');

// @desc Request a mutual session between student and teacher
// @route POST /api/sessions/request
// @access Private
const requestMutualSession = asyncHandler(async (req, res) => {
  const { userId, otherUserId, courseId, preferredTime } = req.body;
  if(!userId || !otherUserId || !courseId || !preferredTime){
    res.status(400);
    throw new Error('Missing required fields');
  }

  const session = await Session.create({
    course: courseId,
    requestedBy: userId,
    requestedTo: otherUserId,
    preferredTime,
    status: 'Pending'
  });

  res.status(201).json({
    message: 'Session request created, awaiting mutual acceptance',
    session
  });
});

// @desc Get all session requests for a user
// @route GET /api/sessions/user/:userId
// @access Private
const getUserSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({
    $or: [
      { requestedBy: req.params.userId },
      { requestedTo: req.params.userId }
    ]
  }).populate('requestedBy requestedTo course');

  res.json(sessions);
});

// @desc Accept a session request
// @route PATCH /api/sessions/:id/accept
// @access Private
const acceptSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if(!session){
    res.status(404);
    throw new Error('Session not found');
  }
  session.status = 'Accepted';
  await session.save();

  res.json({ message: 'Session accepted', session });
});

module.exports = { requestMutualSession, getUserSessions, acceptSession };