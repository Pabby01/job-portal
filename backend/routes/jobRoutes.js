// routes/jobRoutes.js
import express from 'express';
// import Job from '../models/Job.js';
import jobListings from '../db/fakeData.js';
import { protect, employer, admin } from '../middlewares/authMiddleware.js';  // Middleware to check if user is logged in and/or an admin

const router = express.Router();

// Fetch all jobs
router.get('/', async (req, res) => {
  // const jobs = await Job.find({});
  // res.json(jobs);
  return res.json(jobListings);
});

// Fetch all Featured Jobs
router.get('/featured/', (req, res) => {
  const featuredJobs = jobListings.filter(job => job.featured === true);
  return res.json(featuredJobs)
})

// Fetch a single job by ID
router.get('/:id', async (req, res) => {
  const job = jobListings.find(job => job.id == parseInt(req.params.id));
  // const job = await Job.findById(req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

// Create a new job
router.post('/', protect, employer, async (req, res) => {
  const { title, description, salary, location } = req.body;
  const job = new Job({
    title,
    description,
    salary,
    location,
    employer: req.user._id  // Assuming req.user is populated by the protect middleware
  });
  const createdJob = await job.save();
  res.status(201).json(createdJob);
});

// Update a job
router.put('/:id', protect, employer, async (req, res) => {
  const { title, description, salary, location } = req.body;
  const job = await Job.findById(req.params.id);

  if (job) {
    job.title = title;
    job.description = description;
    job.salary = salary;
    job.location = location;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

// Delete a job
router.delete('/:id', protect, admin, async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    await job.remove();
    res.json({ message: 'Job removed' });
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

export default router;
