import mongoose from "mongoose";

const ApplicationSchema = new mongoose({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobListing",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resume: { type: String },
  status: { type: String, default: "pending" },
});

const Application = mongoose.model("Application", ApplicationSchema);
export default Application;
