import express from 'express';
import User from '../models/User.js';
import { protect, employer } from '../middlewares/authMiddleware.js';
import EmployerProfile from '../models/employer.model.js';
import Job from '../models/Job.js';

const router = express.Router();

const roleToModelMap = {
    job_seeker: 'JobSeekerProfile',
    employer: 'EmployerProfile'
};

router.get('/job-applications', protect, async (req, res) => {
    return res.json({ message: 'not available now' });
})

router.get('/saved-jobs', protect, async (req, res) => {
    return { message: 'not available now' }
})

router.get('/profile', protect, async (req, res) => {
    return { message: 'not available now' }
})

router.post('/update-profile', protect, async (req, res) => {
    console.log(req.user, 'user\n', req.body, 'body\n')
    return res.json({ message: 'not available now' });
})

router.post('/upload-resume', protect, async (req, res) => {
    return { message: 'not available now' }
})

// router.post('/update-profile', protect, async (req, res) => {
//     console.log('here')
// })

export default router;
