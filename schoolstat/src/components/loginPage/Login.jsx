import React from 'react'
import './Login.css'
function Login() {
  return (
    <div>
      <h1>Login to SchoolStat</h1>
      <div className="info">
            <div className="userName">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name='userName' placeholder="Enter your username" required/>
            </div>
            <div className="password">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name='password' placeholder="Enter your password" required/>
            </div>
      </div>
      
    </div>
  )
}

export default Login
