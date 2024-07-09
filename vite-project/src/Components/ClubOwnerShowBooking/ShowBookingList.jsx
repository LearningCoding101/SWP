import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form } from "antd";
import ShowBooking from "./ShowBooking";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import api from "../../config/axios";

const ShowBookingList = () => {
  const isLoggedIn = localStorage.getItem("token")
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
      // Remove the sorting logic here
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching booking details", error);
    } finally {
      setLoading(false);
    }
  };


  const sortBookings = () => {
    const sortedBookings = [...bookings].sort((a, b) => {
      const startTimeA = new Date(a.start_time);
      const endTimeA = new Date(a.end_time);
      const startTimeB = new Date(b.start_time);
      const endTimeB = new Date(b.end_time);


      const durationA = (endTimeA - startTimeA) / 1000 / 60 / 60;
      const durationB = (endTimeB - startTimeB) / 1000 / 60 / 60;


      return durationA - durationB;
    });
    setBookings(sortedBookings);
  };


  return (
    <>
      {isLoggedIn ? (
        <div>
          <Form>
            <Form.Item>
            <Link to= {`/clubManage/courtList/${club.clubId}`} >
                <Button type="text" style={{ marginTop: "20px" }}>
                  <ArrowLeftOutlined /> Back 
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
          <Button onClick={sortBookings}>Sort by TimeSlot</Button>
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
                  selectedDate={selectedDate}
                  refreshBookings={fetchBookingDetails} 
                ></ShowBooking>
              );
            })}
          </ul>
        </div>
      ) : (
        navigate('/')
      )}
    </>
  );
};

export default ShowBookingList;
