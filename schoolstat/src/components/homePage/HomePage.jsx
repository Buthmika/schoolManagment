import React from 'react';
import Nav from '../nav/Nav';
import './homePage.css';
import HomePageImage from '../../assets/homePage3.jpg';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
    <div  className="login-wrapper" style={{ backgroundImage: `url(${HomePageImage})` }}>
      
      <div className="mainContent">
        <div className="mainImage">
          
        </div>
      </div>
      <div className="button">
        <button onClick={()=>navigate('/SignUp')}>Sign Up</button>
        <button onClick={()=>navigate('/Login')}>Login</button>
      </div>
    </div>
    </div>
  );
}

export default HomePage;
