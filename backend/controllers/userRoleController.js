const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc Update user role (admin only)
// @route PATCH /api/users/:userId/role
// @access Admin
const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { userId } = req.params;

  if(!req.user || req.user.role !== 'admin'){
    res.status(403);
    throw new Error('Only admins can update roles');
  }

  const user = await User.findById(userId);
  if(!user){
    res.status(404);
    throw new Error('User not found');
  }

  user.role = role;
  await user.save();

  res.json({ message: 'User role updated successfully', user });
});

// @desc Get users with optional role filter and search
// @route GET /api/users
// @access Admin
const getUsers = asyncHandler(async (req, res) => {
  const { role, search } = req.query;
  let query = {};
  if(role) query.role = role;
  if(search) query.name = { $regex: search, $options: 'i' };
  const users = await User.find(query);
  res.json(users);
});

module.exports = { updateUserRole, getUsers };