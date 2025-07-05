import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: String,
  tags: [String],
  status: { type: String, enum: ["pending", "published"], default: "pending" },
  submittedDate: { type: Date, default: Date.now },
  publishedDate: Date
});

export default mongoose.model("Blog", blogSchema);