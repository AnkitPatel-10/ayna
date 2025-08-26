import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/admin/login', form);
      alert('Login successful!');
      localStorage.setItem("adminToken", response.data.token);
      setForm({ email: '', password: '' });
       navigate("/");
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
    <h1>Create a Feedback Form</h1>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
       <br />
      <Link to="/admin/register">
        <button>Register</button>
      </Link>
        <br />
        <Link to="/">
        <button>Home</button>
        </Link>
    </div>

    
  );
};

export default Login;