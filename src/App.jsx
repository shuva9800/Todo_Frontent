import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth';
import TodoList from './components/TodoList';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/signup" element={<Auth setToken={setAuthToken} />} />
          <Route path="/login" element={<Auth setToken={setAuthToken} />} />
          <Route path="/todolist" element={<TodoList token={token} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
