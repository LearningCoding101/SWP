import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const BookingDetail = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get("") //insert court api
      .then((res) => {
        return res.json;
      })
      .then((data) => {
        console.log(data); //just to test if the api load data
        setBookings(data);
      });
  }, []);
  return (
    <div>
      {bookings.map((book) => {
        <div key={book.booking_Detail_id}>
          <p>{book.booking_id}</p>
          <p>Status: {book.status}</p>
          <p>Date: {book.date}</p>
        </div>;
      })}
    </div>
  );
};

export default BookingDetail;
