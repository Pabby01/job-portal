// import mongoose from 'mongoose';

import mongoose from "mongoose";

// const jobSchema = mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   salary: { type: Number },
//   location: { type: String, required: true },
//   employer: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
//   },
//   featured: { type: Boolean, default: false },  // New field to indicate if the job is featured
// }, {
//   timestamps: true
// });

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  salary: { type: Number },
  jobType: { type: String, enum: ['full-time', 'part-time', 'freelance', 'internship', 'contract'], required: true },
  featured: { type: Boolean, default: false },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Employer who posted the job
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of applicants (job seekers)
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
