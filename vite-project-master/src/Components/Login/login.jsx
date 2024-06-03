import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../API/LoginService';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
<script src="https://accounts.google.com/gsi/client" async></script>
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const clientId = '9214086109-fo5ftlj7fjg2rec7fultl2fu268sjhof.apps.googleusercontent.com'
// import { useAuth } from "./AuthProvider"
const Login = () => {
    const [visible, setVisible] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const togglePasswordVisibility = () => {
        setVisible(!visible);
    };
    const navigate = useNavigate();
    // const auth = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault();


        if (email.trim() === '' || password.trim() === '') {
            setError('Please enter both phone number and password');
        }
        else {
            //API call
            try {
                const data = await login(email, password);
                console.log('Login successful!', data);
                navigate("/")


                // Handle successful login (e.g., store token, redirect)
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        }
    };

    return (

        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            placeholder='Enter your email'
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password">Password</label>
                        <input
                            // type={visible ? "text" : "password"}
                            type="password"
                            placeholder='Enter your password'
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"                           
                        />
                        {/* <div className='' onClick={togglePasswordVisibility}>
                            {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </div> */}
                    </div>
                    <div className='form-group'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <input
                                    type="checkbox"
                                />
                                <label htmlFor="rememberme"> Remember me</label>
                            </div>
                            <Link to='/forgotpassword' className='col-md-4'>Forgot password</Link>
                        </div>
                    </div>
                    <button onClick={handleLogin} type="submit" className="login-button">
                        Login
                    </button>
                    <div className='google-button'>
                        <GoogleOAuthProvider clientId="9214086109-fo5ftlj7fjg2rec7fultl2fu268sjhof.apps.googleusercontent.com">
                            <GoogleLogin shape='pill'
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                            />
                        </GoogleOAuthProvider>
                    </div>
                </form>
                <div className='footer-content'>
                    <p>Dont have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;