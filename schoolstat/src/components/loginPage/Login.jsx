import React, { useState } from 'react';
import './Login.css';
import background from '../../assets/login.jpg';
import { useNavigate } from 'react-router-dom';

// firebase
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/landingPage'); // redirect to LandingPage.jsx
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${background})` }}>
      <div className="info">
        <h1>Login to SchoolStat</h1>
        <form onSubmit={handleLogin}>
          <div className="userName">
            <label htmlFor="email"><b>Email</b></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="password">
            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="submit1">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;