// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import DriverProfile from "../models/DriverProfile.js";

export const registerDriver = async (req, res) => {
  try {
    const { name, pfNo, password, depotName, profile } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      pfNo,
      password: hashed,
      role: "DRIVER",
      depotName
    });

    await DriverProfile.create({
      userId: user._id,
      ...profile
    });

    res.status(201).json({ message: "Driver registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  const { pfNo, password } = req.body;

  const user = await User.findOne({ pfNo });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role, depot: user.depotName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};
