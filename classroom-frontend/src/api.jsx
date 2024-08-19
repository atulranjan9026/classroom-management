import axios from 'axios';

const API_URL = 'https://classroom-management-two.vercel.app/';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const createClassroom = (data) => api.post('/classrooms/create', data);
// Add more API functions as needed
