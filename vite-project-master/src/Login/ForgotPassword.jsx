import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    // Here, you would typically make an API call to authenticate the user
    // For this example, we'll just check if the username and password are not empty
    if (email.trim() === '') {
      setError('Please enter your email');
    }
  };
  return (
    <div className='login-container'>
      <div className='login-card'>
        <img src="/assets/password.png" />
        <div className='forgotPass-text'>
          <h3>Forgot your password?</h3>
          <p>Enter your email so that we can send you password reset link</p>
        </div>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder='Enter your email'
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="login-button">
            Send email
          </button>
          <div className="bottom-content">
            <p><Link to='/login'><img src="assets/back.svg" />Back to login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;