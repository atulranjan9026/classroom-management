import React, { useState, useEffect } from 'react';
import { api } from '../api';
import '../styles/ClassroomList.css';

const ClassroomList = ({Key}) => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await api.get('/classrooms');
        setClassrooms(response.data);
      } catch (error) {
        console.error('Failed to fetch classrooms', error);
      }
    };

    fetchClassrooms();
  }, [Key]);

  // Function to ensure days_of_week is always an array
  const formatDaysOfWeek = (daysOfWeek) => {
    if (Array.isArray(daysOfWeek)) {
      return daysOfWeek.join(', ');
    }
    // If it's a string or other type, handle accordingly
    return typeof daysOfWeek === 'string' ? daysOfWeek.split(',').join(', ') : '';
  };

  return (
    <div className="classroom-list-container">
      <table className="classroom-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Teacher Name</th>
            <th>Time</th>
            <th>Days</th>
            <th>Students</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom.id}>
              <td>{classroom.classrooms}</td>
              <td>{classroom.T_name}</td>
              <td>{classroom.start_time} - {classroom.end_time}</td>
              <td>{formatDaysOfWeek(classroom.days_of_week)}</td>
              <td>{classroom.students_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassroomList;
