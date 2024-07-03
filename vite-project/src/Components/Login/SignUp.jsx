// import React, { useState } from 'react'
// import api from '../../config/axios'
// import { useLocation, useNavigate } from 'react-router-dom';
// import { message } from 'antd';

// const SignUp = () => {
//     const [userOTP, setUserOTP] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate
//     const location = useLocation();
//     const { phone, password, email, fullName } = location.state || {}; // Handle potential absence of state
//     const handleConfirmOTP = async () => {
//         const payload = {
//             phone: phone,
//             password: password,
//             email: email,
//             fullName: fullName
//         }
//         try {
//             const response = await api.post(`/register?otp=${userOTP}`, payload)
//             navigate("/login")
//             message.success("Register successfully!")
//         } catch (error) {
//             message.error("Am unknown error occurred. Please try again later.")
//             setError(error.message);
//           }
//     }
//     return (
//         <div className='login-container'>
//         <div className='login-card'>
//           <div className='forgotPass-text'>
//             <h3>Confirm OTP</h3>
//             <p>We have sent a verification code to your email. Enter your code to register.</p>
//           </div>
//           {error && <div className="error">{error}</div>}
//           <form onSubmit={handleConfirmOTP} className="login-form">
//             <div className="form-group">
//               <label htmlFor="userOTP">Verification code</label>
//               <input
//                 type="text"
//                 placeholder='Enter your OTP here'
//                 id="userOTP"
//                 value={userOTP}
//                 onChange={(e) => setUserOTP(e.target.value)}
//                 className="form-input"
//               />
//             </div>

  
//             <button type="submit" className="login-button">
//               Confirm
//             </button>
//           </form>
//         </div>
//       </div>
//     )
// }

// export default SignUp

import { useState, useEffect } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [resendOtpError, setResendOtpError] = useState('');
  const [resendTimeout, setResendTimeout] = useState(60);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (fullname.trim() === '' || password.trim() === '' || phone.trim() === '' || email.trim() === '') {
      setError('Please enter all fields');
    } else {
      try {
        const registerRequest = { phone, password, email, fullname };
        const response = await axios.post('http://badcourts.click:8080/api/sendOTP', registerRequest);
        console.log('OTP sent successfully!', response.data);
        setOtpSent(true);
        setShowOtpModal(true);
        setResendTimeout(60); // Reset the countdown timer
      } catch (err) {
        console.error(err);
        setError(err.response.data || 'Error sending OTP');
      }
    }
  };

  const verifyOtp = async () => {
    try {
      const registerRequest = { phone, password, email, fullname };
      const response = await axios.post(`http://badcourts.click:8080/api/register?otp=${otp}`, registerRequest);
      console.log('Registration successful!', response.data);
      setShowOtpModal(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setOtpError(error.response.data || 'Error verifying OTP');
    }
  };

  const resendOtp = async () => {
    try {
      const registerRequest = { phone, password, email, fullname };
      const response = await axios.post('http://badcourts.click:8080/api/sendOTP', registerRequest);
      console.log('OTP resent successfully!', response.data);
      setResendOtpError('');
      setResendTimeout(60); // Reset the countdown timer
    } catch (err) {
      console.error(err);
      setResendOtpError(err.response.data || 'Error resending OTP');
    }
  };

  useEffect(() => {
    let timer;
    if (resendTimeout > 0) {
      timer = setTimeout(() => {
        setResendTimeout(resendTimeout - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimeout]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign Up</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSignUp} className="login-form">
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
                required
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

      {showOtpModal && (
        <div className="otp-modal">
          <div className="otp-card">
            <h2 className="otp-title">Enter OTP</h2>
            {otpError && <div className="error">{otpError}</div>}
            {resendOtpError && <div className="error">{resendOtpError}</div>}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-input"
            />
            <button onClick={verifyOtp} className="otp-button">
              Verify OTP
            </button>
            <div className="resend-otp">
              {resendTimeout > 0 ? (
                <p>Resend OTP in {resendTimeout}s</p>
              ) : (
                <p>Didn't receive the OTP? <button onClick={resendOtp} className="resend-button">Resend OTP</button></p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;