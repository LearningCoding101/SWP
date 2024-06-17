import "./App.css";
import Home from "./Components/Home/Home";
import "./Components/css/Login.css";
import "./Components/css/SignUp.css";
import "./Components/css/ForgotPassword.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./Components/layout/NavBar";
import { AuthProvider } from "./Components/Login/AuthProvider";
import Footer from "./Components/layout/Footer";
import Login from "./Components/Login/login";
import SignUp from "./Components/Login/SignUp";
import ForgotPassword from "./Components/Login/ForgotPassword";
import Logout from "./Components/Login/Logout";
import ForgotPassConfirm from "./Components/Login/ForgotPassConfirm";
import EmailSent from "./Components/Login/EmailSent";
import ShowNavBar from "./Components/layout/ShowNavBar";
import ShowFooter from "./Components/layout/ShowFooter";
import CRUD from "./Components/common/CRUD";
import Club from "./Components/Clubs/Club";
import ClubDetail from "./Components/Clubs/ClubDetail";
import BookingHistoryPage from "./Components/BookingHistory/BookingHistoryPage";
import Booking from "./Components/CusBooking/Booking";
import Dashboard from "./Components/Admin/Dashboard";
function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/emailsent" element={<EmailSent />} />
            <Route path="/reset-password" element={<ForgotPassConfirm />} />
            <Route path="/clubs" element={<Club />} />
            <Route path="/clubs/:id" element={<ClubDetail />} />
            <Route path="/bookingHistory" element={<BookingHistoryPage />} />
            <Route path="/CRUD" element={<CRUD />} />
            <Route path="/CRUD" element={<CRUD />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/adminDashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
