import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure `user` is required
});

export default mongoose.model('Appointment', appointmentSchema);
