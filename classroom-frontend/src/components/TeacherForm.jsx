import React, { useState } from 'react';
import { api } from '../api';
import '../styles/TeacherForm.css';  // Import the CSS file

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    teacherSubject: '',
    email: '',
    password: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/teachers/TeacherCreate', formData);
      console.log('Teacher created:', response.data);

      // Clear form fields
      setFormData({
        name: '',
        teacherSubject: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

  return (
    <div className="teacher-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Name" 
            required 
          />
        </label>
        <label>
          Subject:
          <input 
            type="text" 
            name="teacherSubject" 
            value={formData.teacherSubject} 
            onChange={handleChange} 
            placeholder="Subject" 
            required 
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
            required 
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Password" 
            required 
          />
        </label>
        <button type="submit">Create Teacher</button>
      </form>
    </div>
  );
};

export default TeacherForm;
