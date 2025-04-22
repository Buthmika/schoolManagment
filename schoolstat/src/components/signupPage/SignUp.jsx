import React from 'react'
import './SignUp.css'
import SignUpImage from '../../assets/signup.png'

function SignUp() {
  return (
    <div>
<div class="signup-wrapper">
  <div className="signImage">
    <img src={SignUpImage} alt="Sign Up" className="signup-image" />
  </div>
  <div className="formDetail">
  <form class="signup-form">
    <h2>Sign Up to SchoolStat</h2>

    <input type="text" name="fullName" placeholder="Full Name" required />

    <input type="email" name="email" placeholder="Email" required />

    <input type="text" name="username" placeholder="Username" required />

    <input type="password" name="password" placeholder="Password" required />

    <input type="password" name="confirmPassword" placeholder="Confirm Password" required />

    <button type="submit">Sign Up</button>

    <p class="login-link">
      Already have an account? <a href="/login">Login</a>
    </p>
  </form>
  </div>
</div>

    </div>
  )
}

export default SignUp
