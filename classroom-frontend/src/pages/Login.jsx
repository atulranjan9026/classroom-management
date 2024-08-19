import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = ({ onLogin }) => {
  return (
    <div>
      
      <AuthForm onLogin={onLogin} />
    </div>
  );
};

export default Login;
