import React, { useEffect, useState } from "react";
import BookingHistory from "./BookingHistory";
import axios from "axios";

const bookings = [
  {
    id: 1,
    Club: "Fpt",
    Address: "kldjaljkda",
    Time: "12/10/2023 7:00",
    BookingCreateTime: "10/10/2023 8:00",
    status: "pending",
  },
  {
    OrderID: 2,
    Club: "Fpt",
    Address: "kldjaljkda",
    Time: "12/10/2023 7:00",
    BookingCreateTime: "10/10/2023 8:00",
    status: "pending",
  },
  {
    OrderID: 3,
    Club: "Fpt",
    Address: "kldjaljkda",
    Time: "12/10/2023 7:00",
    BookingCreateTime: "10/10/2023 8:00",
    status: "pending",
  },
];
const BookingHistoryList = () => {
  const url = "http://152.42.168.144:8080/api/booking/customer";

  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const result = await axios.get(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setBookingHistory(result.data);
  };

  console.log(bookingHistory);
  return (
    <ul className="list-group shadow-sm">
      {bookings.map((booking, index) => {
        return (
          <BookingHistory
            orderID={index + 1}
            club={booking?.club_id}
            //address={booking?.Address}
            //time={booking?.Time}
            bookingCreateTime={booking?.created_by}
            status={booking?.bookingStatusEnum}
          ></BookingHistory>
        );
      })}
    </ul>
  );
};

export default BookingHistoryList;
