import mongoose from "mongoose";

// const EmployerSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     currentPosition: { type: String, required: true },
//     companyName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// Employer profile schema
const employerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  companyWebsite: { type: String },
  description: { type: String },
  currentPosition: { type: String, required: true },
});

const EmployerProfile = mongoose.model('EmployerProfile', employerProfileSchema);

// const Employer = mongoose.model("Employer", EmployerSchema);

// export default Employer;
export default EmployerProfile;
