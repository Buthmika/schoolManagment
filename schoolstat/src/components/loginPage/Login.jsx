import React from 'react'
import './Login.css'
import background from '../../assets/login.jpg'

function Login() {
  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${background})` }}>
      
      <div className="info">
      <h1>Login to SchoolStat</h1>
        <div className="userName">
          <label htmlFor="username"><b>Username</b></label>
          <input type="text" id="username" name='userName' placeholder="Enter your username" required />
        </div>
        <div className="password">
          <label htmlFor="password"><b>Password</b></label>
          <input type="password" id="password" name='password' placeholder="Enter your password" required />
        </div>
        <div className="submit">
          <button type="submit">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
