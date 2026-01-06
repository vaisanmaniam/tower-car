import User from "../models/User.js";

export const getAllDrivers = async (req, res) => {
  const filter = req.query.depot
    ? { depotName: req.query.depot }
    : {};

  const drivers = await User.find({
    role: "DRIVER",
    ...filter
  });

  res.json(drivers);
};
