import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/admin/register', form);
      alert('Registration successful!');
      localStorage.setItem("adminToken", response.data.token);
      setForm({ name: '', email: '', password: '' });
       navigate("/admin/create-form");
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div>
        <h1>Create a Feedback Form</h1>
      <h2>Admin Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
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
        <button type="submit">Register</button>
      </form>
       <br />
      <Link to="/admin/login">
        <button>Login</button>
      </Link>
        <br />
              <Link to="/">
              <button>Home</button>
              </Link>
    </div>
  );
};

export default Register;