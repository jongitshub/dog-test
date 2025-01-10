import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AdminDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments/admin/appointments', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAppointments(response.data);
      } catch (err: any) {
        console.error('Error fetching appointments:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to fetch appointments');
      }
    };

    fetchAllAppointments();
  }, []);

  const calculateCountdown = (date: string, time: string) => {
    const appointmentDateTime = new Date(`${date} ${time.split(' ')[0]}:00 ${time.split(' ')[1]}`);
    const now = new Date();
    const diff = appointmentDateTime.getTime() - now.getTime();

    if (diff <= 0) return 'Time passed';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="border p-4 rounded shadow">
                <p><strong>User:</strong> {appointment.user?.name || 'Unknown'}</p>
                <p><strong>Email:</strong> {appointment.user?.email || 'N/A'}</p>
                <p><strong>Service:</strong> {appointment.service}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Countdown:</strong> {calculateCountdown(appointment.date, appointment.time)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No appointments found.</p>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
