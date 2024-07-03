import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form } from "antd";
import ShowBooking from "./ShowBooking";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import api from "../../config/axios";

const ShowBookingList = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [club, setClubs] = useState([]);
  const { courtId } = useParams();

  const fetchClubs = async () => {
    try {
      const response = await api.get('/club');
      console.log(response.data)
      setClubs(response.data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };
  useEffect(() => {
    fetchClubs();
  }, []);

  const handleDateChange = async (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    fetchBookingDetails(date.format("YYYY-MM-DD"));
  };

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const fetchBookingDetails = async (date) => {
    try {
      setLoading(true);
      const response = await api.get(`/bookingDetail/${courtId}/${date}`);
      const sortedBookings = response.data.sort(
        (a, b) => b.bookingId - a.bookingId
      );
      console.log(sortedBookings);
      setBookings(sortedBookings);
    } catch (error) {
      console.error("Error fetching booking details", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to sort bookings by date
  const sortBookings = () => {
    const sortedBookings = [...bookings].sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
    setBookings(sortedBookings);
  };

  return (
    <div>
      <Form>
        <Form.Item>
          <Link to="/">
            <Button type="text" style={{ marginTop: "20px" }}>
              <ArrowLeftOutlined /> Back to Home Page
            </Button>
          </Link>
        </Form.Item>
        {/* Select a date to display */}
        <Form.Item
          name="Date"
          label="Select Booking Date"
          rules={[
            { required: true, message: "Please select the booking date!" },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            onChange={handleDateChange}
          />
        </Form.Item>
      </Form>
      {/* Add a sort button */}
      <Button onClick={sortBookings}>Sort by Date</Button>
      <ul className="list-group shadow-sm">
        {bookings.map((booking, index) => {
          return (
            <ShowBooking
              key={index}
              bookingID={booking?.bookingId}
              courtTSId={booking?.courtTSId}
              bookingDate={booking?.bookingDate}
              bookingDetailsId={booking?.bookingDetailsId}
              courtName={booking?.courtName}
              fullnameoforder={booking?.fullnameoforder}
              phonenumber={booking?.phonenumber}
              start_time={booking?.start_time}
              end_time={booking?.end_time}
              status={booking?.status}
              clubId={booking?.clubId}
            ></ShowBooking>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowBookingList;
