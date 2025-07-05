import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  registeredAt: { type: Date, default: Date.now }
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  distance: String,
  difficulty: String,
  maxParticipants: Number,
  registrationDeadline: String,
  cost: Number,
  registrations: [registrationSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Event", eventSchema);