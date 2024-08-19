import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import ClassroomForm from '../components/ClassroomForm';
import TeacherList from '../components/TeacherList';
import StudentList from '../components/StudentList';
import TeacherForm from '../components/TeacherForm';
import StudentForm from '../components/StudentForm';
import ClassroomList from '../components/ClassroomList';
import { createClassroom } from '../api';
import '../styles/PrincipalDashboard.css';

const PrincipalDashboard = () => {
  const [updateKey, setUpdateKey] = useState(0);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleCreateClassroom = async (classroomData) => {
    setUpdateKey((prevKey) => prevKey + 1);
    try {
      const response = await createClassroom(classroomData);
      console.log('Classroom created:', response.data);
    } catch (error) {
      console.error('Error creating classroom:', error);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
  
    // Clear any stored tokens or user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  
    // Check if the token and user are removed
    console.log('Token after logout:', localStorage.getItem('token'));
    console.log('User after logout:', localStorage.getItem('user'));
  
    // Redirect to login page
    navigate('/');
  };
  

  return (
    <div className="principal-dashboard-container">
      <div className="header">
        <h1>Principal Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="row">
        <div className="column">
          <div className="form-container">
            <div className="section-header">Create Classroom</div>
            <ClassroomForm onCreate={handleCreateClassroom} />
          </div>
        </div>
        <div className="column">
          <div className="list-section">
            <div className="section-header">Classroom List</div>
            <ClassroomList key={updateKey} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <div className="list-section">
            <div className="section-header">Teacher List</div>
            <TeacherList />
          </div>
        </div>
        <div className="column">
          <div className="list-section">
            <div className="section-header">Student List</div>
            <StudentList />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <div className="form-container">
            <div className="section-header">Create Teacher</div>
            <TeacherForm />
          </div>
        </div>
        <div className="column">
          <div className="form-container">
            <div className="section-header">Create Student</div>
            <StudentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
