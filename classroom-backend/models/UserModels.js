const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {};

User.create = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = `INSERT INTO principal (email, password) VALUES (?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(sql, [email, hashedPassword], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

User.findByEmail = (email) => {
  const sql = `
    SELECT id, email, password, 'principal' AS role FROM principal WHERE email = ?
    UNION
    SELECT id, email, password, 'student' AS role FROM students WHERE email = ?
    UNION
    SELECT id, email, password, 'teacher' AS role FROM teachers WHERE email = ?
    LIMIT 1;
  `;
  return new Promise((resolve, reject) => {
    db.query(sql, [email, email, email], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        reject(err);
      } else {
        console.log('Query result:', result); // Debugging line
        if (result && result.length > 0) {
          resolve(result[0]);
        } else {
          resolve(null); // Handle case where no user is found
        }
      }
    });
  });
};




module.exports = User;
