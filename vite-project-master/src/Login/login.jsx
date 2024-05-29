import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if(username ==='admin' && password ==='admin'){
            navigate('/');
        }
        // Here, you would typically make an API call to authenticate the user
        // For this example, we'll just check if the username and password are not empty
        if (username.trim() === '' || password.trim() === '') {
            setError('Please enter both username and password');
        } else {
            // Successful login, you can redirect the user to the booking page
            console.log('Login successful');
            // Redirect logic here
        }
    };

    return (

        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleLogin} className="login-form">
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
                </form>
                <div className='footer-content'>
                        <p>Dont have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;