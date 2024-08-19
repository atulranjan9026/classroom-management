const db = require('../config/db'); // Adjust path to your DB configuration file


const Timetable ={};

  Timetable.create=(classroom, subject, T_name, start_time, end_time, day) => {
    const sql = `INSERT INTO timetable (classroom, subject, T_name, start_time, end_time, day) VALUES (?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.query(sql, [classroom, subject, T_name, start_time, end_time, day], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  Timetable.getAll= () => {
    return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM timetable`;
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  
module.exports = Timetable;
