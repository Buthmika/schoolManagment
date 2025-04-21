import React from 'react'

function SignUp() {
  return (
    <div>
<div class="signup-wrapper">
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
  )
}

export default SignUp
