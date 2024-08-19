import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogin = (newToken, userRole) => {
    setToken(newToken);
    setRole(userRole);
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to={`/${role}-dashboard`} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/principal-dashboard"
          element={
            token && role === "principal" ? (
              <PrincipalDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            token && role === "teacher" ? (
              <TeacherDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/student-dashboard"
          element={
            token && role === "student" ? (
              <StudentDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
