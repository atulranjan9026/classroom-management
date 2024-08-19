const express = require('express');
const router = express.Router();
const Timetable = require('../models/TimetableModels');

// Route to create a timetable entry
router.post('/create', async (req, res) => {
  const { classroom, subject, T_name, start_time, end_time, day } = req.body;
  try {
    const result = await Timetable.create(classroom, subject, T_name, start_time, end_time, day);
    res.status(201).json({ message: 'Timetable entry created', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const timetables = await Timetable.getAll(); // Ensure this method is implemented in your model
    res.status(200).json(timetables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
