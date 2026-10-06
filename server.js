const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory database for hospital appointments
let appointments = [
  { id: 1, patientName: "Jane Doe", doctor: "Dr. Smith", date: "2026-06-15" }
];

// Home route
app.get('/', (req, res) => {
  res.send('Hospital Appointment System API is running successfully!');
});

// Get all appointments
app.get('/appointments', (req, res) => {
  res.json(appointments);
});

// Create a new appointment
app.post('/appointments', (req, res) => {
  const { patientName, doctor, date } = req.body;
  if (!patientName || !doctor || !date) {
    return res.status(400).json({ error: "Missing required fields: patientName, doctor, date" });
  }
  const newAppointment = {
    id: appointments.length + 1,
    patientName,
    doctor,
    date
  };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

// Prometheus monitoring metrics endpoint
app.get('/metrics', (req, res) => {
  res.send(`# HELP app_status Status of the Hospital App\n# TYPE app_status gauge\napp_status 1\napp_total_appointments ${appointments.length}\n`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;