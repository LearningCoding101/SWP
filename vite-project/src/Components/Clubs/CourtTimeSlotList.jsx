import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../config/axios";
import "../css/CourtTimeSlotList.css";


const CourtTimeSlotList = () => {
    const { courtId } = useParams();
    const [courtTimeSlots, setCourtTimeSlots] = useState([]);

    useEffect(() => {
        api.get(`/courtTimeSlot/${courtId}`)
            .then(response => setCourtTimeSlots(response.data))
            .catch(error => console.error('Error fetching court time slots:', error));
    }, [courtId]);

    return (
        <div className="court-time-slot-list">
            <h1>Court Time Slots</h1>
            {courtTimeSlots.map(courtTimeSlot => (
                <div key={courtTimeSlot.courtTimeSlotId} className="time-slot">
                    {/* <p><strong>Court Time Slot ID:</strong> {courtTimeSlot.courtTimeSlotId}</p> */}
                    {/* <p><strong>Time Slot ID:</strong> {courtTimeSlot.timeSlotId}</p>
                    <p><strong>Court ID:</strong> {courtTimeSlot.CourtId}</p> */}
                    <p><strong>Price:</strong> {courtTimeSlot.price}</p>
                    <p><strong>Start Time:</strong> {courtTimeSlot.start_time}</p>
                    <p><strong>End Time:</strong> {courtTimeSlot.end_time}</p>
                </div>
            ))}
        </div>
    );
}

export default CourtTimeSlotList;
