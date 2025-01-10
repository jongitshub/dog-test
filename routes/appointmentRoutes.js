import express from 'express';
import Appointment from '../models/Appointment.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// POST /appointments
router.post('/', authenticateJWT, async (req, res) => {
  const { service, date, time } = req.body;

  try {
    // Check for missing fields
    if (!service || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for time slot conflicts
    const existingAppointment = await Appointment.findOne({ date, time });
    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }

    // Create new appointment
    const appointment = await Appointment.create({
      service,
      date,
      time,
      user: req.user.id, // Attach logged-in user ID
    });

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /admin/appointments: Fetch all appointments (admin only)
router.get('/admin/appointments', authenticateJWT, async (req, res) => {
  try {
    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    // Fetch all appointments
    const appointments = await Appointment.find().populate('user', 'name email'); // Populate user details
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching all appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /appointments/:id: Delete an appointment by ID
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    // Delete the appointment from the database
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID from the JWT
    const appointments = await Appointment.find({ user: userId }); // Fetch appointments for this user
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
