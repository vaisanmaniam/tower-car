import DriverProfile from "../models/DriverProfile.js";
import DailyLog from "../models/DailyLog.js";

/* ===================== PROFILE ===================== */

/* VIEW OWN PROFILE */
export const getDriverProfile = async (req, res) => {
  const profile = await DriverProfile.findOne({ userId: req.user.id });
  res.json(profile);
};

/* UPDATE BIO DATA */
export const updateBioData = async (req, res) => {
  const { designation, basicPay, dateOfEntry, dateOfAppointment } = req.body;

  const updated = await DriverProfile.findOneAndUpdate(
    { userId: req.user.id },
    {
      designation,
      basicPay,
      dateOfEntry,
      dateOfAppointment
    },
    { new: true }
  );

  res.json(updated);
};

/* UPDATE TRAINING */
export const updateTraining = async (req, res) => {
  const { training } = req.body;

  if (!training?.section || !training?.doneDate || !training?.dueDate) {
    return res.status(400).json({ msg: "Incomplete training details" });
  }

  const updated = await DriverProfile.findOneAndUpdate(
    { userId: req.user.id },
    { training },
    { new: true }
  );

  res.json(updated);
};

/* UPDATE LR */
export const updateLR = async (req, res) => {
  const { lrDetails } = req.body;

  if (!lrDetails?.doneDate || !lrDetails?.dueDate) {
    return res.status(400).json({ msg: "Incomplete LR details" });
  }

  const updated = await DriverProfile.findOneAndUpdate(
    { userId: req.user.id },
    { lrDetails },
    { new: true }
  );

  res.json(updated);
};

/* ===================== DUTY LOG ===================== */

/* SIGN IN */
export const driverSignIn = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // One log per day
  const existingLog = await DailyLog.findOne({
    driverId: req.user.id,
    logDate: today
  });

  if (existingLog) {
    return res.status(400).json({ msg: "Already signed in today" });
  }

  await DailyLog.create({
    driverId: req.user.id,
    logDate: today,
    signInTime: new Date(),
    signInStation: req.body.station
  });

  res.json({ msg: "Signed in successfully" });
};

/* SIGN OUT */
export const driverSignOut = async (req, res) => {
  const { hours, km, mileage, station } = req.body;

  if (!hours || !km) {
    return res.status(400).json({ msg: "Hours and KM required" });
  }

  const log = await DailyLog.findOne({
    driverId: req.user.id,
    signOutTime: null
  });

  if (!log) {
    return res.status(400).json({ msg: "No active duty found" });
  }

  log.signOutTime = new Date();
  log.signOutStation = station;
  log.hours = hours;
  log.km = km;
  log.mileage = mileage;

  await log.save();

  res.json({ msg: "Signed out successfully" });
};

/* ===================== ALERTS ===================== */

export const driverAlerts = async (req, res) => {
  const profile = await DriverProfile.findOne({ userId: req.user.id });
  const today = new Date();

  const alerts = [];

  if (profile?.training?.dueDate && profile.training.dueDate < today) {
    alerts.push({ type: "TRAINING", message: "Training overdue" });
  }

  if (profile?.lrDetails?.dueDate && profile.lrDetails.dueDate < today) {
    alerts.push({ type: "LR", message: "LR overdue" });
  }

  res.json(alerts);
};

export const checkActiveDuty = async (req, res) => {
  try {
    const activeLog = await DailyLog.findOne({
      driverId: req.user.id,
      signOutTime: null
    });

    res.json({
      active: !!activeLog
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to check duty status" });
  }
};

export const getDutyStatus = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const log = await DailyLog.findOne({
    driverId: req.user.id,
    logDate: yesterday
  });

  if (!log) {
    return res.json({ status: "NO_DUTY" });
  }

  if (!log.signOutTime) {
    return res.json({ status: "INCOMPLETE" });
  }

  res.json({ status: "COMPLETED" });
};