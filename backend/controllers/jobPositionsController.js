const asyncHandler = require('express-async-handler');
const SFIA = require('../models/SFIA');

// @desc Assign job positions to SFIA skills
// @route POST /api/jobs/assign
// @access Private (admin/instructor)
const assignJobPositions = asyncHandler(async (req, res) => {
  const { courseId, jobPositions } = req.body;
  if(!courseId || !jobPositions || !Array.isArray(jobPositions)) {
    res.status(400);
    throw new Error('Invalid input');
  }

  const sfia = await SFIA.findOne({ course: courseId });
  if(!sfia){
    res.status(404);
    throw new Error('SFIA skills not found for this course');
  }

  sfia.jobPositions = jobPositions;
  await sfia.save();

  res.status(200).json({ message: 'Job positions assigned successfully', sfia });
});

// @desc Get job positions for a course
// @route GET /api/jobs/:courseId
// @access Public
const getJobPositions = asyncHandler(async (req, res) => {
  const sfia = await SFIA.findOne({ course: req.params.courseId });
  if(!sfia || !sfia.jobPositions){
    return res.status(404).json({ message: 'No job positions found for this course' });
  }
  res.json({ jobPositions: sfia.jobPositions });
});

module.exports = { assignJobPositions, getJobPositions };