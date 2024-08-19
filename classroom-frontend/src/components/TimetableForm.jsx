import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { api } from '../api'; // Ensure this is correctly set up

const daysOfWeekOptions = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

const TimetableForm = () => {
  const [formData, setFormData] = useState({
    classroom: '',
    subject: '',
    T_name: '',
    start_time: '',
    end_time: '',
    day: ''
  });

  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await api.get('/classrooms');
        setClassrooms(response.data);
        // Assuming teachers are fetched separately
        const teacherResponse = await api.get('/teachers');
        setTeachers(teacherResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchClassrooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDayChange = (selectedOption) => {
    setFormData({ ...formData, day: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/timetable/create', formData);
      alert('Timetable created successfully!');
      setFormData({
        classroom: '',
        subject: '',
        T_name: '',
        start_time: '',
        end_time: '',
        day: ''
      });
    } catch (error) {
      console.error('Error creating timetable:', error);
      alert('Error creating timetable');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="classroom" value={formData.classroom} onChange={handleChange} required>
        <option value="">Select Classroom</option>
        {classrooms.map((classroom) => (
          <option key={classroom.id} value={classroom.classrooms}>
            {classroom.classrooms}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
        required
      />

      <select name="T_name" value={formData.T_name} onChange={handleChange} required>
        <option value="">Select Teacher Name</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.name}>
            {teacher.name}
          </option>
        ))}
      </select>

      <input
        type="time"
        name="start_time"
        value={formData.start_time}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="end_time"
        value={formData.end_time}
        onChange={handleChange}
        required
      />
      <Select
        name="day"
        options={daysOfWeekOptions}
        value={daysOfWeekOptions.find(option => option.value === formData.day)}
        onChange={handleDayChange}
        placeholder="Select Day"
        required
      />
      <button type="submit">Create Timetable</button>
    </form>
  );
};

export default TimetableForm;
