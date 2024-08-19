// models/TeacherModels.js
const db = require('../config/db');

const Teacher = {};

// models/TeacherModels.js
Teacher.TeacherCreate = (name, teacherSubject, email, password, role) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO teachers (name, teacherSubject, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, teacherSubject, email, password, role], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


// Method to fetch all teachers
Teacher.getAll = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM teachers';
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Method to update a teacher
Teacher.update = (id, email, password) => {
  return new Promise((resolve, reject) => {
    // Only update fields that are provided
    const query = 'UPDATE teachers SET email = ?, password = ? WHERE id = ?';
    const params = [email, password, id].filter(param => param !== undefined);

    db.query(query, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Method to delete a teacher
Teacher.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM teachers WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = Teacher;
