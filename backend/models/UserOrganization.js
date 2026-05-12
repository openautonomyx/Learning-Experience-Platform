const mongoose = require('mongoose');

const userOrganizationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  role: { type: String, enum: ['student','teacher','admin','hr','recruiter','recruitment_agency'], required: true },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserOrganization', userOrganizationSchema);