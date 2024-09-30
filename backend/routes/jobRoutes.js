// routes/jobRoutes.js
import express from 'express';
import multer from 'multer';
import Job from '../models/Job.js';
import { protect, employer, admin } from '../middlewares/authMiddleware.js';  // Middleware to check if user is logged in and/or an admin

const router = express.Router();
const upload = multer();

// Fetch all jobs
router.get('/', async (_req, res) => {
  const jobs = await Job.find({});
  res.json(jobs);
});

// Fetch all Featured Jobs
router.get('/featured', async (_req, res) => {
  const featuredJobs = await Job.find({ featured: true });
  return res.json(featuredJobs)
})

// Fetch a single job by ID
router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

// Create a new job
router.post('/', upload.none(), protect, employer, async (req, res) => {
  const { title, description, salary, location, jobType, featured } = req.body;
  try {
    const job = new Job({
      title,
      description,
      salary,
      location,
      jobType,
      featured,
      employer: req.user._id
    });
    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (e) {
    next(e);
  }
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
