"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface LoginFormProps {
  username: string;
  password: string;
  onSubmit: (username: string, password: string) => void;
}
const LoginForm: React.FC<LoginFormProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // This effect will only run on the client side
    // You can add any necessary client-side initialization logic here
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });

      if (response.status === 200 && response.data.success) {
        alert("Authentication Successful with status: " + response.status);
      } else {
        setError('Authentication failed');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during authentication');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
