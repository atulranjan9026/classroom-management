import React, { useState } from 'react';
import { login } from '../api';
import '../styles/AuthForm.css'; 

const AuthForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      onLogin(response.data.token, response.data.role);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="auth-form-container">
    <h1>Login </h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AuthForm;
