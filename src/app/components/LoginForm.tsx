"use client";
import React, { useState } from 'react';
import axios from 'axios';
import crypto from 'crypto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';


const LoginForm: React.FC= () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const hashPassword = (password: string): string => {
    const hash = crypto.createHash('sha256');
    return hash.update(password).digest('hex');
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password: hashPassword(password) });

      if (response.status === 200 && response.data.success) {
        alert("Authentication Successful with status: " + response.status);

      } else {
        setError('Authentication failed');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during authentication, check your username and password');
    }
  };


  return (
    <div className="container-fluid form-div">
      <h1 className="text-primary display-4 mb-4">Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label text-secondary fw-bold">
            Username
          </label>
          <input
            type="text"
            className="form-control rounded-pill"
            id="username"
            placeholder="Enter your username"
            style={{ width: '70%' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-secondary fw-bold">
            Password
          </label>
          <input
            type="password"
            className="form-control rounded-pill"
            id="password"
            placeholder="Enter your password"
            style={{ width: '70%' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-3 btn btn-primary btn-block rounded-pill submit-btn"
          style={{ width: '70%' }}
        >
          Login
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
