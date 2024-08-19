const db = require('../config/db');

const Classroom = {};


Classroom.create = (classroom_name, T_name, start_time, end_time, days_of_week, students) => {
  return new Promise((resolve, reject) => {
    // Convert arrays to comma-separated strings
    const studentsName = students.join(',');
    const daysOfWeekString = days_of_week.join(',');
    
    const sql = 'INSERT INTO classrooms (classrooms, T_name, start_time, end_time, days_of_week, students_name) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [classroom_name, T_name, start_time, end_time, daysOfWeekString, studentsName], (err, result) => {
      if (err) {
        console.error('Database error:', err); // Log the error
        return reject(err);
      }
      resolve(result);
    });
  });
};


// Get all classrooms
Classroom.getAll = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM classrooms';
    db.query(sql, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = Classroom;
