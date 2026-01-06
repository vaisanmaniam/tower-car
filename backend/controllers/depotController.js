import User from "../models/User.js";
import DailyLog from "../models/DailyLog.js";

// Current function to get only drivers (keep it if needed)
export const getDepotDrivers = async (req, res) => {
  const drivers = await User.find({
    role: "DRIVER",
    depotName: req.user.depot
  }).select("name pfNo depotName"); // only return necessary fields

  res.json(drivers);
};

// NEW: Get depot drivers + their daily logs
export const getDepotDailyLogs = async (req, res) => {
  try {
    const depot = req.user.depot;

    // Get all drivers in this depot
    const drivers = await User.find({ role: "DRIVER", depotName: depot });

    const logs = [];

    for (let driver of drivers) {
      const driverLogs = await DailyLog.find({ driverId: driver._id })
        .sort({ signInTime: -1 }); // latest logs first

      logs.push({
        driverName: driver.name,
        pfNo: driver.pfNo,
        dailyLogs: driverLogs
      });
    }

    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
