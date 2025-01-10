import mongoose from "mongoose";
import { Appointment } from "./models/Appointment.js";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    // Test query
    const appointments = await Appointment.find().populate("userId", "name email");
    console.log("Fetched appointments:", appointments);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error querying database:", error);
  }
})();
