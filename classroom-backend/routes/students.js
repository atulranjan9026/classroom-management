const express = require('express');
const router = express.Router();
const Student = require('../models/StudentModels');
const bcrypt = require('bcrypt');

// Route to create a new student
router.post('/StudentCreate', async (req, res) => {
  const { name, rollNumber, studentClass, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Student.StudentCreate(name, rollNumber, studentClass, email, hashedPassword);
    res.status(201).json({ message: 'Student created', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.getAll();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  const { name, rollNumber, studentClass, email, password } = req.body;
  const { id } = req.params;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Student.update(id, name, rollNumber, studentClass, email, hashedPassword);
    res.status(200).json({ message: 'Student updated', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Student.delete(id);
    res.status(200).json({ message: 'Student deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
