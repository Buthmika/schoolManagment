import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SignUp.css';
import SignUpImage from '../../assets/signup1.png';
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        studentName: formData.fullName,
        grade: "",
        term: "",
        marks: {}, // empty marks initially
        createdAt: new Date()
      });

      navigate("/home");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <div className="signup-wrapper">
        <div className="signImage">
          <img src={SignUpImage} alt="Sign Up" className="signup-image" />
        </div>
        <div className="formDetail">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up to SchoolStat</h2>
            <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
            <button type="submit">Sign Up</button>
            <p className="login-link">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;