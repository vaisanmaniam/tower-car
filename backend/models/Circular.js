// models/Circular.js
import mongoose from "mongoose";

const circularSchema = new mongoose.Schema({
  title: String,
  pdfUrl: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Circular", circularSchema);
