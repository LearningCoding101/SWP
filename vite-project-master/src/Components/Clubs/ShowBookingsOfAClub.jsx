import React, { useEffect, useState } from 'react';
import api from '../../config/axios';
import '../css/ShowBookingsOfAClub.css';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import moment from 'moment';

const ShowBookingsOfAClub = () => {
    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.get('booking/getBookings')
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const filteredBookings = bookings.filter(booking => booking.id.toString().includes(search));

    return (
        <div>
            <h1>ShowBookingsOfAClub</h1>
            <Input placeholder="Search by Booking ID" value={search} onChange={e => setSearch(e.target.value)} />
            {filteredBookings.map((booking, index) => (
                <div key={index} className="booking-card">
                    <h2>{booking.club_name}</h2>
                    <p>Booking ID: {booking.id}</p>
                    <p>Booking Date: {moment(booking.bookingDate).format('YYYY MMMM Do dddd')}</p>
                    <p>Price: {booking.price}</p>
                    <p>Email: {booking.account_email}</p>
                    <p>Phone: {booking.account_number}</p>
                    <p>Status: {booking.status}</p>
                    <p>Address: {booking.address}</p>
                    <Link to={`/clubManage/ShowBookingsOfAClub/UpdateForOwner/${booking.id}/${booking.clubId}`}>Update Booking</Link>
                </div>
            ))}
        </div>
    );
}

export default ShowBookingsOfAClub;
