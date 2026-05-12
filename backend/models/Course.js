const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  price: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false }
},{ timestamps: true });

module.exports = mongoose.model('Course', courseSchema);