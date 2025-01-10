import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [service, setService] = useState('Dog Sitting'); // Default value
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const timeWindows = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
  ];

  useEffect(() => {
    // Fetch booked appointments
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAppointments(response.data); // Update state with fetched appointments
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    fetchAppointments();
  }, []);

  const handleBooking = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/appointments',
        { service, date, time },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setMessage('Appointment booked successfully!');
      setAppointments((prev) => [...prev, response.data.appointment]); // Add new appointment
      setService('Dog Sitting');
      setDate('');
      setTime('');
    } catch (err: any) {
      console.error('Error booking appointment:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Schedule Dog Sitting Appointments</h1>

        {message && <p className={`mb-4 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

        <form onSubmit={handleBooking} className="mb-6">
          <div className="mb-4">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">
              Service
            </label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Dog Sitting">Dog Sitting</option>
              <option value="Dog Walking">Dog Walking</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a time</option>
              {timeWindows.map((window, index) => (
                <option key={index} value={window}>
                  {window}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Book Appointment
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4">Your Booked Appointments</h2>
        {appointments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="border p-4 rounded shadow">
                <p><strong>Service:</strong> {appointment.service}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No appointments booked yet.</p>
        )}
      </div>
    </>
  );
};

export default Home;
