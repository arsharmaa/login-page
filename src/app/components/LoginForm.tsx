"use client";
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';

interface LoginFormProps {
  username: string;
  password: string;
  onSubmit: (username: string, password: string) => void;
}
const LoginForm: React.FC<LoginFormProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    // This effect will only run on the client side
    // You can add any necessary client-side initialization logic here
  }, []);

  const hashPassword = (password: string): string => {
    const hash = crypto.createHash('sha256');
    return hash.update(password).digest('hex', (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    });
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
