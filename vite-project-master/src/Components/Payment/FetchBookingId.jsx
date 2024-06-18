import React, { useState } from 'react'
import api from '../../config/axios'
import BookingForm from '../BookingForm/BookingForm'

const FetchBookingId = async (test) => {
    const [data, setData] = useState([])
    try {
        const bookingData = await api.get("/booking/customer")
        setData(bookingData)
    }
    catch (error) {
        console.log(error)
    }

    return (
        <div>
            {data?.map((booking) => {
            return (
            <BookingForm>
                <div bookingId={booking.id}></div>
            </BookingForm>
            )
            
        })};
        <div>
            <BookingForm
            showBookingId={test}
            > 
            </BookingForm>
        </div>
        </div>
    )
}

export default FetchBookingId