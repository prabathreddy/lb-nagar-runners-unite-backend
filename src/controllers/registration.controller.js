import Event from "../models/event.model.js";

// Register a user for an event
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if already registered
    if (event.registrations.some((r) => r.userId.equals(req.user._id))) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }

    // Optionally: check registration deadline, max participants
    if (event.maxParticipants && event.registrations.length >= event.maxParticipants) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Add registration
    event.registrations.push({ userId: req.user._id });
    await event.save();

    res.status(201).json({ message: "Registered successfully", eventId: event._id });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};