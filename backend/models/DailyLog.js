import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  logDate: {
    type: Date,
    required: true,
    index: true
  },

  signInTime: { type: Date, required: true },
  signInStation: { type: String, required: true },

  signOutTime: Date,
  signOutStation: String,
alcoholConsumed: Boolean,

  hours: Number,
  km: Number,
  mileage: Number

}, { timestamps: true });

export default mongoose.model("DailyLog", dailyLogSchema);
