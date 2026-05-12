const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  criteriaUrl: { type: String }, // link to SFIA skills or Open Badges criteria
  issuer: { type: String },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verified: { type: Boolean, default: false },
  dateAwarded: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Badge', badgeSchema);