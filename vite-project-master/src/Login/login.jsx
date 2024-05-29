// import React, { useState } from 'react'
// export default function Login() {

//     return (
//         <div className='container'>
//             <div className='row content'>
//                 <h3 className='title'>Login</h3>
//                 <div className='text-box'>
//                     <input
//                         type="email"
//                         placeholder='Email'
//                     />
//                     <input
//                         type="password"
//                         placeholder='Password'
//                     />
//                 </div>

//                 <div className='container-button'>
//                     <button className='login'>Log in</button>
//                 </div>
//                 <div className='forgot-password'>
//                     <p>Forgot password? Click here</p>
//                 </div>
//                 <div className='register'>
//                     <p>Dont have an account? <span>Sign up now</span></p>
//                 </div>
//             </div>
//         </div>


//     )
// }
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
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
                <h2 className="login-title">Looooooginnnnnn</h2>
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
                        <input
                            type="checkbox"
                        />
                        <label htmlFor="rememberme"> Remember me</label>
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                <div className='footer-content'>
                    <div className='row'>
                        <p><a href="/forgotpassword">Forgot password</a></p>
                        <p>Dont have an account? <Link to="/signup">Sign up</Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;