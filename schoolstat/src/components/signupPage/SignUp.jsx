import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SignUp.css';
import SignUpImage from '../../assets/signup1.png';

// firebase
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

  // input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // create user in firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // save extra info in firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        createdAt: new Date()
      });

      alert("Signup successful!");
      navigate("/home"); // go to homepage

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
