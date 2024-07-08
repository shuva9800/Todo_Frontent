import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? 'https://todo-backend-1-cxgn.onrender.com/api/users/signup' : 'https://todo-backend-1-cxgn.onrender.com/api/users/login';
    const response = await axios.post(url, { email, password });
    setToken(response.data.user._id); // or response.data.token if using tokens
    navigate('/todolist');
  };

  return (
    <div>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default Auth;
