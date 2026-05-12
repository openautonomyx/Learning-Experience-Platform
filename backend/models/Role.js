const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, enum: ['student', 'teacher', 'admin', 'hr', 'recruiter'] },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);