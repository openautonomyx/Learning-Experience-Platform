const asyncHandler = require('express-async-handler');
const SFIA = require('../models/SFIA');

// @desc Assign SFIA skills to a course
// @route POST /api/sfia/assign
// @access Private (admin/instructor)
const assignSFIA = asyncHandler(async (req, res) => {
  const { courseId, skills } = req.body;
  if(!courseId || !skills || !Array.isArray(skills)) {
    res.status(400);
    throw new Error('Invalid input');
  }

  const sfia = await SFIA.create({
    course: courseId,
    skills
  });

  res.status(201).json({ message: 'SFIA skills assigned', sfia });
});

// @desc Get SFIA skills for a course
// @route GET /api/sfia/:courseId
// @access Public
const getSFIAForCourse = asyncHandler(async (req, res) => {
  const sfia = await SFIA.findOne({ course: req.params.courseId });
  if(!sfia){
    return res.status(404).json({ message: 'No SFIA skills found for this course' });
  }
  res.json(sfia);
});

module.exports = { assignSFIA, getSFIAForCourse };