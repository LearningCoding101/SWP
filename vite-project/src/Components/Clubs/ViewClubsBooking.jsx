import React, { useEffect, useState } from 'react'
import api from "../../config/axios";

const ViewBookings = ({ clubId }) => {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const response = await api.get(`/getBookings/${clubId}`);
            console.log(response.data)
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="booking-details-container">
            {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                    <div key={index} className="booking-details">
                        <h2 className="booking-id">Booking ID: {booking.id}</h2>
                        <p className="booking-date">Date: {booking.bookingDate}</p>
                        <p className="booking-price">Price: ${booking.price}</p>
                        <p className="booking-status">Status: {booking.status}</p>
                        <p className="booking-type">Booking Type ID: {booking.bookingTypeId}</p>
                        <p className="booking-address">Address: {booking.address}</p>
                    </div>
                ))
            ) : (
                <p>No booking data available.</p>
            )}
        </div >
    );
}

export default ViewBookings;
