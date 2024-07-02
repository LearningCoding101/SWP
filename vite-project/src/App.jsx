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

import ShowBookingList from "./Components/ClubOwnerShowBooking/ShowBookingList";
import { AuthProvider } from "./Components/Login/AuthProvider";
import Login from "./Components/Login/login";
import SignUp from "./Components/Login/SignUp";
import ForgotPassword from "./Components/Login/ForgotPassword";
import Logout from "./Components/Login/Logout";
import ForgotPassConfirm from "./Components/Login/ForgotPassConfirm";
import EmailSent from "./Components/Login/EmailSent";
import CRUD from "./Components/common/CRUD";
import Club from "./Components/Clubs/Club";
import ClubDetail from "./Components/Clubs/ClubDetail";
// import Dashboard from './Components/Admin/Dashboard'
import BookingHistoryPage from "./Components/BookingHistory/BookingHistoryPage";
import BookingForm from "./Components/BookingForm/BookingForm";
import Feedback from "./Components/Feedback/Feedback";
import Transaction from "./Components/Payment/Transaction";
import QRScanner from "./Components/QRCheckin/StaffPage";
import ClubOwnerManage from "./Components/Clubs/ClubOwnerManage";
import UpdateClub from "./Components/Clubs/UpdateClub";
import CourtList from "./Components/Clubs/CourtList";
// import AddClubCombo from './Components/Admin/AddClubCombo'
import AddCourt from "./Components/Clubs/AddCourt";
import CourtTimeSlotList from "./Components/Clubs/CourtTimeSlotList";

import AddCourtTimeSlot from "./Components/Clubs/AddCourtTimeSlot";
import BookingReport from "./Components/Admin/BarChart";
import MyResponsiveLine from "./Components/Admin/LineGraph";
import StaffBookingForm from "./Components/BookingForm/StaffBookingForm";
import UpdateForCustomer from "./Components/Clubs/UpdateForCustomer";
import UpdateForOwner from "./Components/Clubs/UpdateForOwner";
import ShowBookingsOfAClub from "./Components/Clubs/ShowBookingsOfAClub";
function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/" element={<Home />} />
            <Route
              path="/clubManage/courtList/addCourt/:clubId"
              element={<AddCourt />}
            />
            <Route path="/AddCourtTimeSlot" element={<AddCourtTimeSlot />} />
            <Route
              path="/clubManage/courtList/CourtsDetail/:courtId"
              element={<CourtTimeSlotList />}
            />
            <Route path="/UpdateForCustomer/:bookingid/:clubid" element={<UpdateForCustomer />} />
            <Route path="/clubManage/ShowBookingsOfAClub" element={<ShowBookingsOfAClub />} />
            <Route path="/clubManage/ShowBookingsOfAClub/UpdateForOwner/:bookingid/:clubid" element={<UpdateForOwner />} />
            <Route path="/login" element={<Login />} />
            <Route path="/staff" element={<QRScanner />} />
            <Route path="/profile" element={<Logout />} />
            <Route path="/clubManage" element={<ClubOwnerManage />} />
            <Route
              path="/clubManage/clubUpdate/:clubId"
              element={<UpdateClub />}
            />
            <Route
              path="/clubManage/courtList/:clubId"
              element={<CourtList />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/emailsent" element={<EmailSent />} />
            <Route path="/reset-password" element={<ForgotPassConfirm />} />
            <Route path="/clubs" element={<Club />} />
            <Route path="/clubs/:address" element={<ClubDetail />} />
            <Route path="/bookingHistory" element={<BookingHistoryPage />} />
            <Route path="/booking/:id" element={<BookingForm />} />
            <Route path="/StaffBooking/:id" element={<StaffBookingForm />} />
            <Route path="/transaction/:bookingId" element={<Transaction />} />

            <Route path="/feedback" element={<Feedback />} />
            <Route path="/CRUD" element={<CRUD />} />
            {/* <Route path="/adminDashboard" element={<Dashboard />} />
            <Route path="/AddClubCombo" element={<AddClubCombo />} /> */}
            <Route path="/showBooking" element={<ShowBookingList />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/line" element={<MyResponsiveLine />} />
            <Route path="/bar" element={<BookingReport />} />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
