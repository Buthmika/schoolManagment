import React from 'react';
import Nav from '../nav/Nav';
import './homePage.css';
import HomePageImage from '../../assets/homePage3.jpg';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${HomePageImage})` }}>
      <div className="navi">
        <Nav />
      </div>

      <div className="mainContent">
        <div className="home-container">
          <h1>Welcome to <span className="highlight">SchoolStat</span></h1>
          <p>Get your Leaving & Character Certificates online</p>
          <h2>Simple & Fast Certificate Requests</h2>
          <p>Apply online with ease</p>
        </div>

        <div className="button">
          <button onClick={() => navigate('/SignUp')}>Sign Up</button>
          <button onClick={() => navigate('/Login')}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
