import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://college-web-platform-backend-code.onrender.com/admin/register', { email, password });
      console.log(response.data); // Assuming the server responds with some data
      // Reset form fields on successful registration
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      setError("Registration failed. Please try again.");
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
        <button>Register</button>
      </form>
    </div>
  )
}
