import React, { useState, useEffect } from "react";
import { api } from "../api";
import "../styles/StudentList.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [newName, setNewName] = useState("");
  const [newRollNumber, setNewRollNumber] = useState("");
  const [newClass, setNewClass] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await api.get("/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students", error);
        setMessage("Error fetching students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditStudent(student);
    setNewName(student.name);
    setNewRollNumber(student.RollNumber);
    setNewClass(student.class);
    setNewEmail(student.email);
    setNewPassword("");
    setMessage("");
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.put(`/students/${editStudent.id}`, {
        name: newName,
        RollNumber: newRollNumber,
        class: newClass,
        email: newEmail,
        password: newPassword,
      });
      setStudents(
        students.map((student) =>
          student.id === editStudent.id
            ? {
                ...student,
                name: newName,
                RollNumber: newRollNumber,
                class: newClass,
                email: newEmail,
                password: newPassword,
              }
            : student
        )
      );
      setEditStudent(null);
      setMessage("Student updated successfully");
    } catch (error) {
      console.error("Error updating student", error);
      setMessage("Error updating student");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
      setMessage("Student deleted successfully");
    } catch (error) {
      console.error("Error deleting student", error);
      setMessage("Error deleting student");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setEditStudent(null);
    setNewName("");
    setNewRollNumber("");
    setNewClass("");
    setNewEmail("");
    setNewPassword("");
  };

  return (
    <div className="student-list-container">
      {/* <h2>Student List</h2> */}
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <p>Name: {student.name}</p>
            <p>Roll Number: {student.RollNumber}</p>
            <p>Class: {student.class}</p>
            <p>Email: {student.email}</p>
            <button onClick={() => handleEdit(student)} className="Edit">
              Edit
            </button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editStudent && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <h3>Edit Student</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New Name"
            />
            <input
              type="text"
              value={newRollNumber}
              onChange={(e) => setNewRollNumber(e.target.value)}
              placeholder="New Roll Number"
            />
            <input
              type="text"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
              placeholder="New Class"
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

export default StudentList;
