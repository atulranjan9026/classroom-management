import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication
export const login = (email, password) => api.post('/auth/login', { email, password });

// Classroom API
export const createClassroom = (data) => api.post('/classrooms/create', data);

export const fetchTeachers = () => api.get('/teachers');
export const fetchStudents = () => api.get('/students');