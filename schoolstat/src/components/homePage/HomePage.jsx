import React from 'react'
import Nav from '../nav/Nav'
import './homePage.css'
import HomePageImage from '../../assets/homePage.png'

function HomePage() {
  return (
    <div>
      <Nav></Nav>
      <div className="mainContent">
            <div className="mainImage">
                  <img src={HomePageImage} alt="" />
            </div>
      </div>
      <div className="button">
            <button>Sign Up</button>
            <button>Login</button>
      </div>
      

</div>
    
  )
}

export default HomePage
