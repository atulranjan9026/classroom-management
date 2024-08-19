// routes/teacher.js
const express = require('express');
const router = express.Router();
const Teacher = require('../models/TeacherModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// routes/teacher.js
router.post('/TeacherCreate', async (req, res) => {
  const { name, teacherSubject, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create teacher
    const result = await Teacher.TeacherCreate(name, teacherSubject, email, hashedPassword, 'teachers');
    res.status(201).json({ message: 'Teacher created', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Route to get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.getAll();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update a teacher
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    // Optionally hash password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const result = await Teacher.update(id, email, hashedPassword);
    res.status(200).json({ message: 'Teacher updated', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete a teacher
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Teacher.delete(id);
    res.status(200).json({ message: 'Teacher deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
