import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../config/axios";
import "../css/CourtTimeSlotList.css";

const CourtTimeSlotList = () => {
    const { courtId } = useParams();
    const [courtTimeSlots, setCourtTimeSlots] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/courtTimeSlot/${courtId}`)
            .then(response => setCourtTimeSlots(response.data || []))
            .catch(error => console.error('Error fetching court time slots:', error));
    }, [courtId]);

    const handleAddCourtTimeSlot = () => {
        navigate('/AddCourtTimeSlot', { state: { courtId: courtId } });
    };

    const handleDeleteCourtTimeSlot = (courtTimeSlotId) => {
        api.delete(`/courtTimeSlot/${courtTimeSlotId}`)
            .then(response => {
                console.log(response.data);
                setCourtTimeSlots(courtTimeSlots.filter(courtTimeSlot => courtTimeSlot.courtTimeSlotId !== courtTimeSlotId));
            })
            .catch(error => console.error('Error deleting court time slot:', error));
    };

    return (
        <div className="court-time-slot-list">
            <h1>Court Time Slots</h1>
            {courtTimeSlots.map(courtTimeSlot => (
                <div key={courtTimeSlot.courtTimeSlotId} className="time-slot">
                    <p><strong>Price:</strong> {courtTimeSlot.price}</p>
                    <p><strong>Start Time:</strong> {courtTimeSlot.start_time}</p>
                    <p><strong>End Time:</strong> {courtTimeSlot.end_time}</p>
                    <button onClick={() => handleDeleteCourtTimeSlot(courtTimeSlot.courtTimeSlotId)} className="btn btn-danger">
                        Delete CourtTimeSlot
                    </button>
                </div>
            ))}
            <button onClick={handleAddCourtTimeSlot} className="btn btn-warning">
                Add CourtTimeSlot
            </button>
        </div>
    );
}

export default CourtTimeSlotList;
