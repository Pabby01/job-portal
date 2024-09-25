import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number },
  location: { type: String, required: true },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  featured: { type: Boolean, default: false },  // New field to indicate if the job is featured
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
