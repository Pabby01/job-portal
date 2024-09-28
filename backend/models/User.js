import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['job_seeker', 'employer', 'admin'], required: true },
  profile: {
    // Additional fields for Job Seekers
    resume: { type: String },  // Link to uploaded resume (if job seeker)
    skills: [String],
    experience: { type: String },
    education: { type: String },

    // Additional fields for Employers
    companyName: { type: String },  // If employer
    companyWebsite: { type: String },
  },
  createdAt: { type: Date, default: Date.now }
});

// const userSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   isAdmin: { type: Boolean, required: true, default: false },
//   isEmployee: { type: Boolean, required: true, default: false },
// }, {
//   timestamps: true
// });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model('User', userSchema);
export default User;
