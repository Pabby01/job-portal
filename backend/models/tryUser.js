const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['job_seeker', 'employer', 'admin'], required: true },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'role'
    },
    createdAt: { type: Date, default: Date.now }
});

const jobSeekerProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resume: { type: String },
    skills: [String],
    experience: { type: String },
    education: { type: String }
});

const employerProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    companyWebsite: { type: String },
    description: { type: String }
});

const User = mongoose.model('User', userSchema);
const JobSeekerProfile = mongoose.model('job_seeker', jobSeekerProfileSchema);
const EmployerProfile = mongoose.model('employer', employerProfileSchema);

module.exports = { User, JobSeekerProfile, EmployerProfile };
