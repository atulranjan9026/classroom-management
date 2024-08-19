import React from "react";
import { useNavigate } from "react-router-dom";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import TimetableForm from "../components/TimetableForm";
import TimetableList from "../components/TimetableList";
import "../styles/TeacherDashboard.css"; 

const TeacherDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    onLogout(); 
    navigate('/'); 
  };

  return (
    <div className="TDashboard">
      <h1 className="h1">Teacher Dashboard</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <div className="teacher-dashboard-container">
        <div className="student-form-container">
          <h2>Student Form</h2>
          <StudentForm />
        </div>
        <div className="student-list-container-TD">
          <h2>Student List</h2>
          <StudentList />
        </div>
      </div>
      <div className="teacher-dashboard-container">
        <div className="form-container">
          <h2>Create Timetable</h2>
          <TimetableForm />
        </div>
        <div className="list-container">
          <h2>Timetable List</h2>
          <TimetableList />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
