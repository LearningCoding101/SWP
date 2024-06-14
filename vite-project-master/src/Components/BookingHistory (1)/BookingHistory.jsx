import React, { useState } from "react";
import BookingDetails from "./BookingDetails";

const BookingHistory = (props) => {
  let [showBookingDetail, updateShowBookingDetail] = useState(false);
  function displayDetail() {
    updateShowBookingDetail(true);
  }
  function hideDetail() {
    updateShowBookingDetail(false);
  }
  return (
    <li
      className="list-group-item"
      style={{ margin: 7, backgroundColor: "ivory" }}
    >
      <div className="container media align-items-lg-center flex-column flex-lg-row p-3 d-flex">
        <div className="media-body col-8">
          <h5 className="mt-0 font-weight-bold mb-2">
            Order ID: {props.orderID}
          </h5>
          <p className="font-italic text-muted mb-0 small text-secondary">
            Club: {props.club} - {props.address}
          </p>
          <p className="text-muted mb-0 small text-secondary padding-right-50">
            Time: {props.time}
          </p>
          <p className="text-muted mb-0 small text-secondary">
            Booking Create Time: {props.bookingCreateTime}
          </p>
        </div>
        <div className="col-2 ">
          <span className="text-center badge bg-success">{props.status}</span>
        </div>
        <div className="col-2 ">
          <button className="bg-primary bg-opacity-50" onClick={displayDetail}>
            Details
          </button>
        </div>
        <BookingDetails
          showDetail={showBookingDetail}
          hideDetail={hideDetail}
        ></BookingDetails>
      </div>
    </li>
  );
};

export default BookingHistory;
