import './App.css'
import Login from './Login/login'
import Home from './Home/Home'
import SignUp from './Login/SignUp'
import ForgotPassword from './Login/ForgotPassword'
import './css/Login.css'
import './css/SignUp.css'
import './css/ForgotPassword.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
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
            path="/signup"
            element={<SignUp />}
          />
          <Route
          path='/forgotpassword'
          element={<ForgotPassword/>}
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
