import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://college-web-platform-backend-code.onrender.com/admin/login', { email, password });
      console.log(response.data); // Assuming the server responds with some data
      // Reset form fields on successful login
      navigate("/delete/sports");
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      setError("Login failed. Please check your email and password.");
      console.error(err);
    }
  }

  return (
    <div className='register-form'>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button>Login</button>
      </form>
    </div>
  )
}
