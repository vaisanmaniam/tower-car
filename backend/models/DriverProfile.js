// models/DriverProfile.js
import mongoose from "mongoose";

const driverProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  designation: String,
  basicPay: Number,
  dateOfEntry: Date,
  dateOfAppointment: Date,

  training: {
    section: String,
    doneDate: Date,
    dueDate: Date,
    schedule: String
  },

  lrDetails: {
    doneDate: Date,
    dueDate: Date,
    schedule: String
  }

}, { timestamps: true });

export default mongoose.model("DriverProfile", driverProfileSchema);
