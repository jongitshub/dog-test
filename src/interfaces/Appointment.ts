export interface Appointment {
    _id: string; // MongoDB ObjectId as a string
    user: {
      name: string; // Name of the user who booked the appointment
    };
    service: string; // Name or type of service booked
    date: string; // Date of the appointment as an ISO string
  }
  