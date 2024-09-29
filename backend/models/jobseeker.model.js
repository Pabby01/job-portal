import mongoose from "mongoose";

// const JobSeekerSchema = new mongoose.Schema(
//   {
//     //username: { type: String, required: true, unique: true },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// Job seeker profile schema
const jobSeekerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: String }, // Link to uploaded resume
  skills: [String],
  experience: { type: String },
  education: { type: String }
});

// const JobSeeker = mongoose.model("JobSeeker", JobSeekerSchema);

// export default JobSeeker;

const JobSeekerProfile = mongoose.model('JobSeekerProfile', jobSeekerProfileSchema);

export default JobSeekerProfile;
