// models/DailyLog.js
import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  signInTime: Date,
  signInStation: String,

  signOutTime: Date,
  signOutStation: String,

  hours: Number,
  km: Number,
  mileage: Number

}, { timestamps: true });

export default mongoose.model("DailyLog", dailyLogSchema);
