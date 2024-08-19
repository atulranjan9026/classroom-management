import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { createClassroom } from '../api';
import { api } from '../api';
import '../styles/ClassroomForm.css';

const daysOfWeekOptions = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

const ClassroomForm = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    classrooms: '',
    T_name: '',
    start_time: '',
    end_time: '',
    days_of_week: [], // Array of selected options
    students: [],
  });

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get('/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await api.get('/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };

    fetchTeachers();
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDayChange = (selectedOptions) => {
    setFormData({
      ...formData,
      days_of_week: selectedOptions.map(option => option.value),
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      const selectedStudents = checked
        ? [...prevFormData.students, value]
        : prevFormData.students.filter(student => student !== value);
      return { ...prevFormData, students: selectedStudents };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClassroom(formData);
      setSuccessMessage('Classroom created successfully!');
      setFormData({
        classrooms: '',
        T_name: '',
        start_time: '',
        end_time: '',
        days_of_week: [],
        students: [],
      });
      // Clear the success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      // Call the onCreate callback to update the ClassroomList
      onCreate();
    } catch (error) {
      console.error('Error creating classroom', error);
    }
  };

  return (
    <div className="classroom-form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="classrooms"
          value={formData.classrooms}
          onChange={handleChange}
          placeholder="Classroom Name"
          required
        />
        <select
          name="T_name"
          value={formData.T_name}
          onChange={handleChange}
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.name}>
              {teacher.name}
            </option>
          ))}
        </select>

        <div className="time-inputs">
          <div className="time-group">
            <label htmlFor="start_time">Start Time:</label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="time-group">
            <label htmlFor="end_time">End Time:</label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="days-of-week">
          <label htmlFor="days_of_week">Days of the Week:</label>
          <Select
            name="days_of_week"
            options={daysOfWeekOptions}
            isMulti
            value={daysOfWeekOptions.filter(option => formData.days_of_week.includes(option.value))}
            onChange={handleDayChange}
            placeholder="Select days of the week"
            required
          />
        </div>
        
        <div className="student-checkboxes">
          <h3>Select Students</h3>
          {students.map((student) => (
            <div key={student.id} className="checkbox-container">
              <input
                type="checkbox"
                id={`student-${student.id}`}
                value={student.name}
                checked={formData.students.includes(student.name)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`student-${student.id}`}>{student.name}</label>
            </div>
          ))}
        </div>
        
        <button type="submit">Create Classroom</button>
      </form>
    </div>
  );
};

export default ClassroomForm;
