import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="9214086109-fo5ftlj7fjg2rec7fultl2fu268sjhof.apps.googleusercontent.com"/>
    <App />
  </React.StrictMode>,
)
