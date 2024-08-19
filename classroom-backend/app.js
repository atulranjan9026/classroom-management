const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS method
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions)); // Use CORS options first
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(express.json());
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');
const classroomRoutes = require('./routes/classrooms');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const timetableRoutes = require('./routes/timetable');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/timetable', timetableRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
