import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { emailConfirm } from '../API/ForgotPassService';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const handleLogin = async(e, token) => {
    e.preventDefault();
    // Here, you would typically make an API call to authenticate the user
    // For this example, we'll just check if the username and password are not empty
    if (email.trim() === '') {
      setError('Please enter your email');
    }
    else{
      try {
        const data = await emailConfirm(email);
        console.log('Valid email', data);
        
        navigate("/emailsent")


        // Handle successful login (e.g., store token, redirect)
    } catch (err) {
        console.error(err);
        setError(err.message);
    }
    }
  };
  return (
    <div className='login-container'>
      <div className='login-card'>
        <link rel='alternate' type='image' href="./public/password.png" />
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
            <p><Link to='/login'><link rel='alternate' type='image/svg+xml' href="./public/back.svg" />Back to login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;