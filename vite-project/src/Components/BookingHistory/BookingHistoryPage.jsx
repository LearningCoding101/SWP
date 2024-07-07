import React from "react";
import BookingHistoryList from "./BookingHistoryList";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import SearchNavBar from "../layout/SearchNavBar";

const BookingHistoryPage = () => {
  return (
    <div>
      <SearchNavBar />
      <div className="row">
        <div className="col-lg-8 mx-auto" style={{marginTop: 100, marginBottom: 50}}>
          <BookingHistoryList></BookingHistoryList>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingHistoryPage;
