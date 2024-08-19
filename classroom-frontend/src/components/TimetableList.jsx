import React, { useState, useEffect } from 'react';
import { api } from '../api'; // Ensure this is correctly set up
import '../styles/TimetableList.css'; // Import the CSS file

const TimetableList = () => {
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const response = await api.get('/timetable');
        setTimetables(response.data);
      } catch (error) {
        console.error('Error fetching timetable data', error);
      }
    };

    fetchTimetables();
  }, []);

  return (
    <div className="timetable-list">
      <h2 className="timetable-title">Timetable</h2>
      {timetables.length > 0 ? (
        <table className="timetable-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Classroom</th>
              <th className="table-header-cell">Subject</th>
              <th className="table-header-cell">Teacher Name</th>
              <th className="table-header-cell">Start Time</th>
              <th className="table-header-cell">End Time</th>
              <th className="table-header-cell">Day</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {timetables.map((timetable) => (
              <tr key={timetable.id} className="table-row">
                <td className="table-cell">{timetable.classroom}</td>
                <td className="table-cell">{timetable.subject}</td>
                <td className="table-cell">{timetable.T_name}</td>
                <td className="table-cell">{timetable.start_time}</td>
                <td className="table-cell">{timetable.end_time}</td>
                <td className="table-cell">{timetable.day}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-timetables">No timetables available.</p>
      )}
    </div>
  );
};

export default TimetableList;
