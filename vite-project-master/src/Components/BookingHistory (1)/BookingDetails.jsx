import React, { useEffect, useState } from "react";
import "./BookingDetails.css";
import ReactDOM from "react-dom";
import api from "../../Config/axios";
import { Empty } from "antd";
import { useParams } from "react-router-dom";

const BookingDetails = (props) => {
  
  const [bookingDetails, setBookingDetails] = useState([])

   const test = props.showId.orderID
  
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const data2 = await api.get(`/bookingDetail/${test}`)
        console.log('Booking details data', data2.data);
        setBookingDetails(data2.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetch()
  }, [])
  return ReactDOM.createPortal(
    <>
      <div
        className={`alert ${props.showDetail ? "" : "hidden"}`}
        style={{ backgroundColor: "white" }}
      >
        <h2>Detail</h2>
        <div>
          {
            bookingDetails.length > 0 ? (
              // <div>
              //   {bookingDetails?.map((booking) => (
              //     <div className="column" key={booking.bookingId}>
              //       <p>Court No: {booking.courtName}</p>
              //       <p>Name: {booking.fullnameoforder}</p>
              //       <p>Phone: {booking.phonenumber}</p>
              //       <p>Start time: {booking.start_time}</p>
              //       <p>End time: {booking.end_time}</p>
                    
              //     </div>
              //   ))}
              // </div>
              <div className="container">
  <div className="row row-cols-1 row-cols-md-2 g-4">
    {bookingDetails?.map((booking) => (
      <div className="col" key={booking.bookingId}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Court: {booking.courtName}</h5>
            <p className="card-text">
              Name: {booking.fullnameoforder} <br />
              Phone: {booking.phonenumber}
            </p>
            <p className="card-text">
              <span className="fw-bold">Time:</span>
              <br />
              Start: {booking.start_time} <br />
              End: {booking.end_time}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
            ) : <Empty />
          }
        </div>
        <button className="modal-btn" onClick={props.hideDetail}>
          Cancel
        </button>
      </div>
      <div className={`overlay ${props.showDetail ? "" : "hidden"}`}></div>
    </>,
    document.getElementById("root-portal")
  );
};

export default BookingDetails;
