import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './LoginService';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
<script src="https://accounts.google.com/gsi/client" async></script>

const clientId = '9214086109-fo5ftlj7fjg2rec7fultl2fu268sjhof.apps.googleusercontent.com'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();

        //API call
        if (email.trim() === '' || password.trim() === '') {
            setError('Please enter both email and password');
        }
        try {
            const data = await login(phone, password);
            console.log('Login successful!', data);
            navigate("/")
            // Handle successful login (e.g., store token, redirect)
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (

        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Log in</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Phone number</label>
                        <input
                            type="text"
                            placeholder='Enter your phone number'
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            <GoogleLogin c shape='pill' hosted_domain='http://badcourts.click/login'
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