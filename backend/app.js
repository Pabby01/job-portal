//Creating a basic server using Express(main server entry point)
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import multer from 'multer';

// import jobseekerRoutes from "./routes/jobseeker.route.js"; // Importing the default export
// import employerRoutes from "./routes/employer.route.js"; // Importing the default export


import { createServer } from 'http'; // To create the HTTP server
import { Server as SocketIO } from 'socket.io';
import { connectDB } from "./config/db.js";

import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import EmployerRoutes from './routes/employerRoutes.js';

dotenv.config();
connectDB();

const app = express();

// const upload = multer();

// app.post('/api/jobs', upload.none(), (req, res) => {
//   console.log(req.body);
//   // Your logic here
// });

app.use(cors());

app.use(express.json()); //express middleware to pass JSON bodies

app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/employer', EmployerRoutes);


// Create an HTTP server to work with Socket.IO
const server = createServer(app);

// Initialize the Socket.IO server
const io = new SocketIO(server, {
  cors: {
    origin: '*',  // Allow connections from any origin
    methods: ['GET', 'POST'] // Specify allowed methods
  }
});

// Simulate a database of job applications
const applications = []; // Store job applications (could be replaced with DB calls)

// Set up Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle notification for application status change
  socket.on('application-status-change', (applicationId, status) => {
    const application = applications.find(app => app.id === applicationId);
    if (application) {
      application.status = status;
      io.to(application.jobSeekerSocketId).emit('status-update', status);
    }
  });

  // Notify employer when a new job application is received
  socket.on('job-applied', (jobId, jobSeekerId) => {
    // Notify the employer who posted the job
    const employerSocketId = 1./* Logic to get employer's socket ID */;
    if (employerSocketId) {
      io.to(employerSocketId).emit('new-application', {
        jobId,
        jobSeekerId,
        message: 'A new application has been submitted for your job posting!'
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


const PORT = process.env.PORT ? process.env.PORT : 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
