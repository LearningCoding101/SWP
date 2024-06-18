import "./App.css";
import Home from "./Components/Home/Home";
import "./Components/css/Login.css";
import "./Components/css/SignUp.css";
import "./Components/css/ForgotPassword.css";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import Dashboard from "./Components/Admin/Dashboard";
import BookingHistoryPage from "./Components/BookingHistory (1)/BookingHistoryPage";
import BookingForm from "./Components/BookingForm/BookingForm";
import StaffPage from "./StaffPage";
import QRScanner from "./StaffPage";
function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/staff" element={<QRScanner />} />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/emailsent" element={<EmailSent />} />
            <Route path="/reset-password" element={<ForgotPassConfirm />} />
            <Route path="/clubs" element={<Club />} />
            <Route path="/clubs/:address" element={<ClubDetail />} />
            <Route path="/bookingHistory" element={<BookingHistoryPage />} />
            <Route path="/booking" element={<BookingForm />} />

            <Route path="/CRUD" element={<CRUD />} />

            <Route path="/adminDashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
