import express from 'express';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js'; // Utility function to generate JWT
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/posted-jobs', (req, res) => {
    console.log('gotten1')
})

router.get('/applications', (req, res) => {
    console.log('gotten2')
})

router.get('/company-profile', (req, res) => {
    console.log('gotten3')
})

router.post('/post-job', (req, res) => {
    console.log('gotten4')
})

router.post('/update-company-profile', protect, (req, res) => {
    // get company through logged in employer
    console.log(req)
    // update company details
    // save back to db
    return;
})

export default router;
