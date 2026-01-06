import Circular from "../models/Circular.js";

export const uploadCircular = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file) return res.status(400).json({ msg: "PDF file is required" });

    const circular = await Circular.create({
      title,
      pdfUrl: req.file.path, // Multer + Cloudinary stores URL in path
      postedBy: req.user.id
    });

    res.status(201).json({ msg: "Circular uploaded successfully", circular });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Optional: Get all circulars (for frontend notifications)
export const getCirculars = async (req, res) => {
  try {
    const circulars = await Circular.find().sort({ createdAt: -1 });
    res.json(circulars);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
