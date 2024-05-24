import { useState } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password2, setPassword2] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Here, you would typically make an API call to authenticate the user
    // For this example, we'll just check if the username and password are not empty
    if (username.trim() === '' || password.trim() === '' || firstname.trim() === '' || lastname.trim() === '') {
      setError('Please enter all fields');
    } else if (password2.trim() != password.trim()) {
      setError('Password does not match');
    }
    
    else {
      // Successful login, you can redirect the user to the booking page
      console.log('Login successful');
      // Redirect logic here
    }

    

  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign Up</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className='row'>
            <div className='user-info'>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                placeholder='Your first name'
                id='firstname'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className='form-input2'
              />
            </div>
            <div className='user-info'>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                placeholder='Your last name'
                id='lastname'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className='form-input2'
              />
            </div>

          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder='Enter your username'
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder='Enter your password'
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm password</label>
            <input
              type="password"
              placeholder='Re-enter your password'
              id="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="form-input"
            />
          </div>
          <div className='form-group'>
            <input
              type="checkbox"
            />
            <label htmlFor="rememberme"> By signing up, I agree with the Terms of Use & Privacy Policy</label>
          </div>
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>
        <div className='footer-content2'>
          <div className='row2'>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>

        </div>
      </div>
    </div>
  )
}
export default SignUp;
