import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassroomForm from '../components/ClassroomForm';
import TeacherList from '../components/TeacherList';
import StudentList from '../components/StudentList';
import TeacherForm from '../components/TeacherForm';
import StudentForm from '../components/StudentForm';
import ClassroomList from '../components/ClassroomList';
import { createClassroom } from '../api';
import '../styles/PrincipalDashboard.css';

const PrincipalDashboard = ({ onLogout }) => {
  const [updateKey, setUpdateKey] = useState(0);
  const navigate = useNavigate();

  const handleCreateClassroom = async (classroomData) => {
    try {
      const response = await createClassroom(classroomData);
      console.log('Classroom created:', response.data);
      setUpdateKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error creating classroom:', error);
      // Consider showing an error message to the user here
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    onLogout();
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
