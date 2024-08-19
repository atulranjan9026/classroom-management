import React, { useState, useEffect } from 'react';
import { api } from '../api';
import '../styles/TeacherList.css';  // Import the CSS file

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [editTeacher, setEditTeacher] = useState(null);
  const [newName, setNewName] = useState('');
  const [newTeacherSubject, setNewTeacherSubject] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await api.get('/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Failed to fetch teachers', error);
        setMessage('Error fetching teachers');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    setEditTeacher(teacher);
    setNewName(teacher.name);
    setNewTeacherSubject(teacher.teacherSubject);
    setNewEmail(teacher.email);
    setNewPassword('');  // Keep password field empty for security
    setMessage('');
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.put(`/teachers/${editTeacher.id}`, {
        name: newName,
        teacherSubject: newTeacherSubject,
        email: newEmail,
        password: newPassword,
      });
      setTeachers(teachers.map(teacher => (
        teacher.id === editTeacher.id ? {
          ...teacher,
          name: newName,
          teacherSubject: newTeacherSubject,
          email: newEmail,
          password: newPassword
        } : teacher
      )));
      setEditTeacher(null);
      setMessage('Teacher updated successfully');
    } catch (error) {
      console.error('Error updating teacher', error);
      setMessage('Error updating teacher');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/teachers/${id}`);
      setTeachers(teachers.filter(teacher => teacher.id !== id));
      setMessage('Teacher deleted successfully');
    } catch (error) {
      console.error('Error deleting teacher', error);
      setMessage('Error deleting teacher');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setEditTeacher(null);
    setNewName('');
    setNewTeacherSubject('');
    setNewEmail('');
    setNewPassword('');
  };

  return (
    <div className="teacher-list-container">
      {/* <h2>Teacher List</h2> */}
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <p>Name: {teacher.name}</p>
            <p>Subject: {teacher.teacherSubject}</p>
            <p>Email: {teacher.email}</p>
            <button onClick={() => handleEdit(teacher) }className="Edit">Edit</button>
            <button onClick={() => handleDelete(teacher.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editTeacher && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>×</button>
            <h3>Edit Teacher</h3>
            <input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              placeholder="New Name" 
            />
            <input 
              type="text" 
              value={newTeacherSubject} 
              onChange={(e) => setNewTeacherSubject(e.target.value)} 
              placeholder="New Subject" 
            />
            <input 
              type="email" 
              value={newEmail} 
              onChange={(e) => setNewEmail(e.target.value)} 
              placeholder="New Email" 
            />
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="New Password" 
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;
