import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClassroomList from '../components/ClassroomList';
import '../styles/StudentDashboard.css'; 

const StudentDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    onLogout();  
    navigate('/');  
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <ClassroomList />
    </div>
  );
};

export default StudentDashboard;
