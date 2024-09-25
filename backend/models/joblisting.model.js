import mongoose from "mongoose";

const JobListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    salary: { type: Number },
    jobType: { type: String },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

const JobListing = mongoose.model("JobListing", JobListingSchema);

export default JobListing;
