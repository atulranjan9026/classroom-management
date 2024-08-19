import React, { useState } from 'react';
import { api } from '../api';
import '../styles/StudentForm.css';

const StudentForm = ({ studentToEdit, onStudentUpdated }) => {
  const [name, setName] = useState(studentToEdit ? studentToEdit.name : '');
  const [rollNumber, setRollNumber] = useState(studentToEdit ? studentToEdit.RollNumber : '');
  const [studentClass, setStudentClass] = useState(studentToEdit ? studentToEdit.class : '');
  const [email, setEmail] = useState(studentToEdit ? studentToEdit.email : '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = studentToEdit ? `/students/${studentToEdit.id}` : '/students/StudentCreate';
    const method = studentToEdit ? 'PUT' : 'POST';

    try {
      const response = await api({
        method,
        url,
        data: { name, rollNumber, studentClass, email, password },
      });
      console.log(studentToEdit ? 'Student updated:' : 'Student created:', response.data);
      setMessage('Submit completed');
      setName('');
      setRollNumber('');
      setStudentClass('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(studentToEdit ? 'Error updating student:' : 'Error creating student:', error);
      setMessage('Error submitting form');
    }
  };

  return (
    <div className="student-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Roll Number:
          <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
        </label>
        <label>
          Class:
          <input type="text" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">{studentToEdit ? 'Update Student' : 'Create Student'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StudentForm;
