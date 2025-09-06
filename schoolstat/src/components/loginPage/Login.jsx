import React, { useState } from 'react';
import './Login.css';
import background from '../../assets/login.jpg';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    let email = identifier;
    if (!identifier.includes('@')) {
      const q = query(collection(db, "users"), where("username", "==", identifier));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        email = querySnapshot.docs[0].data().email;
      } else {
        alert("No user found with that username.");
        setLoading(false);
        return;
      }
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/landingPage');
    } catch (err) {
      alert("Login failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${background})` }}>
      <div className="info">
        <h1>Login to SchoolStat</h1>
        <form onSubmit={handleLogin}>
          <div className="userName">
            <label htmlFor="identifier"><b>Email or Username</b></label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              placeholder="Enter your email or username"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="submit1">
            <button type="submit" disabled={loading}>
              {loading ? "Login" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;