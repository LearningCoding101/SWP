import { useState } from 'react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../API/SignUpService';
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import OTPConfirm from './SignUp';
const SignUp = () => {
  const [visible, setVisible] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  // const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (fullname.trim() === '' || password.trim() === '' || phone.trim() === '' || email.trim() === '') {
      setError('Please enter all fields');
    } //else if (password2.trim() != password.trim()) {
    //   setError('Password does not match');
    // }
    else {
      try {
        const data = await register(phone, password, email, fullname);
        console.log('Registration successful!', data);
        // navigate("/confirmOTP")
        navigate('/confirmOTP', { state: { phone: phone, password: password, email: email, fullName: fullname } }); // Using useNavigate
        // Handle successful registration (e.g., redirect to login)
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
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
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                placeholder='Your full name'
                id='fullname'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className='form-input2'
              />
            </div>
            <div className='user-info'>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder='Enter your email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='form-input2'
              />
            </div>

          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              type="text"
              placeholder='Enter your phone number'
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
      {/* <OTPConfirm
        phone={phone}
        password={password}
        email={email}
        fullName={fullname}
      ></OTPConfirm> */}
    </div>
  )
}
export default SignUp;
