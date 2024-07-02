import React, { useEffect, useState } from "react";
import BookingHistory from "./BookingHistory";
import axios from "axios";
import api from "./../../config/axios";

const BookingHistoryList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // const response = await api.get("/booking/customer", {
        //   transformResponse: [
        //     (data) => {
        //       // Transform the response data to handle empty responses
        //       return data ? JSON.parse(data) : [];
        //     },
        //   ],
        // });
        const response = await api.get("/booking/customer");
        // console.log(response);
        const sortedBookings = response.data.sort((a, b) => b.id - a.id);
        console.log(response.data);
        setCustomers(sortedBookings);
        // const data = response.data;
        // const bookingId = data.id;
        // localStorage.setItem("Id", bookingId);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCustomers();
  }, []);
  // console.log(customers);
  return (
    <ul className="list-group shadow-sm">
      {/* <h1>History</h1> */}
      {customers.map((booking) => {
        return (
          <BookingHistory
            orderID={booking?.id}
            clubId={booking?.clubId}
            club={booking?.club_name}
            address={booking?.address}
            time={booking?.Time}
            type={booking?.bookingTypeId}
            bookingCreateTime={booking?.bookingDate}
            status={booking?.status}
          ></BookingHistory>
        );
      })}
    </ul>
  );
};

export default BookingHistoryList;
