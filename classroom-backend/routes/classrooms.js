const express = require('express');
const router = express.Router();
const Classroom = require('../models/ClassroomModels');

router.post('/create', async (req, res) => {
  const { classrooms, T_name, start_time, end_time, days_of_week, students } = req.body;
  try {
    // Make sure that Classroom.create receives parameters correctly
    const result = await Classroom.create(classrooms, T_name, start_time, end_time, days_of_week, students);
    res.status(201).json({ message: 'Classroom created', result });
  } catch (err) {
    console.error('Error in POST /create:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
});



// Route to get all classrooms
router.get('/', async (req, res) => {
  try {
    const classrooms = await Classroom.getAll();
    res.status(200).json(classrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
