import express from 'express';
import multer from 'multer';
import User from '../models/User.js';
import { protect, employer } from '../middlewares/authMiddleware.js';
import EmployerProfile from '../models/employer.model.js';
import JobSeekerProfile from '../models/jobseeker.model.js';
// import Job from '../models/Job.js';

import path from 'path';

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // files will be saved in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // unique filename
    }
});

// Create Multer upload instance
const upload = multer({ storage: storage });

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

router.post('/update-profile', upload.single('resume'), protect, async (req, res) => {

    const user = req.user;
    if (user.role === 'job_seeker') {
        try {
            const userProfile = await JobSeekerProfile.findOne({ user: user._id });
            console.log(userProfile, 'Profile')
            if (!userProfile) {
                return res.status(404).json({ message: 'User profile not found' });
            }

            userProfile.email = req.body.email || userProfile.email;
            userProfile.skills = JSON.parse(req.body.skills) || userProfile.skills;
            userProfile.name = req.body.skills || userProfile.name;
            // userProfile.resume = req.file.path || userProfile.resume

            // Check if a file was uploaded, and if so, set the resume field
            if (req.file) {
                userProfile.resume = req.file.path || userProfile.resume;  // Store the file path or use req.file.filename depending on your need
            }

            // Save the updated profile
            console.log(userProfile, 'profile')
            // await userProfile.save();

            return res.json({ message: 'Profile updated successfully', profile: userProfile });
        } catch (e) {
            console.error('An error occurred', e)
        }
    } else {
        res.json({ message: "Don't have neccessary permissions" })
    }
})

router.post('/upload-resume', protect, async (req, res) => {
    return { message: 'not available now' }
})

// router.post('/update-profile', protect, async (req, res) => {
//     console.log('here')
// })

export default router;
