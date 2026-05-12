const mongoose = require('mongoose');

const sfiaSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  skills: [{ type: String, required: true }],
},{ timestamps: true });

module.exports = mongoose.model('SFIA', sfiaSchema);