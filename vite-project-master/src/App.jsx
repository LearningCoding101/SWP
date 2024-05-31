import './App.css'
import Home from './Components/Home/Home'
import './Components/css/Login.css'
import './Components/css/SignUp.css'
import './Components/css/ForgotPassword.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from './Components/layout/NavBar'
import { AuthProvider } from './Components/Login/AuthProvider'
import Footer from './Components/layout/Footer'
import Login from './Components/Login/login'
import SignUp from './Components/Login/SignUp'
import ForgotPassword from './Components/Login/ForgotPassword';
import Logout from './Components/Login/Logout';
function App() {
  return (
    <AuthProvider>
      <main>
        
        <Router>
          <NavBar />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/logout"
              element={<Logout />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
            <Route
              path='/forgotpassword'
              element={<ForgotPassword />}
            />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </Router>
        <Footer />
      </main>
     </AuthProvider>
  )
}

export default App
