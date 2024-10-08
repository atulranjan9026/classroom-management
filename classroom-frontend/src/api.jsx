import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const login = (email, password) => api.post('/api/auth/login', { email, password });

export const createClassroom = (data) => api.post('/classrooms/create', data);
