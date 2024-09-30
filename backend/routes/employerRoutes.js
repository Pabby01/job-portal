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


router.get('/posted-jobs', protect, employer, async (req, res) => {
    try {
        const employerId = req.user._id;
        const postedJobs = await Job.find({ employer: employerId });

        res.json(postedJobs);
    } catch (error) {
        console.error('Error fetching posted jobs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/applications', protect, employer, (req, res) => {
    console.log('gotten2')
})

router.get('/company-profile', protect, employer, async (req, res) => {
    const user = req.user;
    try {
        const employerProfile = await EmployerProfile.findOne({ user: user._id });
        return res.json(employerProfile)
    } catch (e) {
        return res.status(404).json({ message: 'an error occured' })
    }
})

router.post('/post-job', protect, employer, async (req, res) => {
    const { title, description, location, salary, jobType, featured } = req.body;
    const user = req.user;

    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            featured,
            jobType,
            employer: user._id
        });
        await newJob.save();
        res.status(201).json({ message: 'Job posted successfully', job: newJob });
    } catch (error) {
        console.error("Couldn't save job:", error);
        res.status(500).json({ message: 'Error posting job. Please try again later.' });
    }
});


router.post('/update-company-profile', async (req, res) => {
    const { user: userDetails, companyProfile } = req.body;

    if (userDetails.role === 'employer') {
        try {
            const employerProfile = await EmployerProfile.findOne({ user: userDetails._id });

            if (!employerProfile) {
                return res.status(404).json({ message: 'Employer profile not found' });
            }

            // Update the employer profile fields with data from companyProfile
            employerProfile.companyName = companyProfile.name || employerProfile.companyName;
            employerProfile.companyWebsite = companyProfile.website || employerProfile.companyWebsite;
            employerProfile.currentPosition = companyProfile.position || employerProfile.currentPosition;


            const user = await User.findByIdAndUpdate(
                userDetails._id,
                { profile: employerProfile._id },
                { new: true }
            ).populate({
                path: 'profile',
                model: roleToModelMap[userDetails.role], // Use the mapping to get the correct model
            });

            if (!user) {
                console.log('User not found');
                return res.status(404).json({ message: 'User not found' });
            }
            await employerProfile.save();


            return res.json(employerProfile)
        } catch (error) {
            console.error('Error finding user:', error);
            return res.status(500).json({ message: 'An error occurred while updating the profile' });
        }
    } else {
        return res.status(500).json({ message: 'User is not an employer' })
    }
});


export default router;
