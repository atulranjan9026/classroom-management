const db = require('../config/db');

const Student = {};

// Create a new student
Student.StudentCreate = (name, rollNumber, studentClass, email, password) => {
  return new Promise((resolve, reject) => {
    const role = 'students'; // Set the role to 'students'
    const query = 'INSERT INTO students (name, RollNumber, class, email, password, role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, rollNumber, studentClass, email, password, role], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Get all students
Student.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Update student details
Student.update = (id, name, rollNumber, studentClass, email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE students SET name = ?, RollNumber = ?, class = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, [name, rollNumber, studentClass, email, password, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete a student
Student.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM students WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = Student;
