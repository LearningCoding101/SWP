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
import ForgotPassConfirm from './Components/Login/ForgotPassConfirm'
import EmailSent from './Components/Login/EmailSent'
import ShowNavBar from './Components/layout/ShowNavBar'
import ShowFooter from './Components/layout/ShowFooter'
import CRUD from './Components/common/CRUD'
import Club from './Components/Clubs/Club'
function App() {
  return (
    <AuthProvider>
      <main>
        
        <Router>
          <ShowNavBar>
          <NavBar />
          </ShowNavBar>
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
              path='/emailsent'
              element={<EmailSent />}
            />
            <Route
              path='/reset-password'
              element={<ForgotPassConfirm />}
            />
            <Route
              path='/clubs'
              element={<Club />}
            />
            <Route
              path='/CRUD'
              element={<CRUD />}
            />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </Router>
        {/* <ShowFooter> */}
        <Footer />
        {/* </ShowFooter> */}
      </main>
     </AuthProvider>
  )
}

export default App
