import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from "../../config/axios";
import { Button, Form, Card } from 'react-bootstrap';
// import '../css/AddCourtTimeSlots.css';

const AddCourtTimeSlot = ({ onCourtTSAdded, onClose, courtId, courtTimeSlots }) => {

    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    useEffect(() => {
        const fetchTimeSlot = async () => {
            if (!courtId) {
                alert('No courtId provided');
                return;
            }

            console.log(timeSlots);
            const response = await api.get('/timeslots')
                .then(response => setTimeSlots(response.data))
                .catch(error => console.error('Error fetching time slots:', error));
            console.log(timeSlots);
        }
        fetchTimeSlot();
    }, [courtId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const courtTimeSlotRequest = { timeSlotId: selectedTimeSlot, courtId: Number(courtId) };
            console.log('Request payload:', courtTimeSlotRequest);
            await api.post(`/courtTimeSlot`, courtTimeSlotRequest);
            alert('Court time slot created successfully');
            onClose();
            onCourtTSAdded();
        } catch (error) {
            console.error('Error creating court time slot:', error);
            alert('Error creating court time slot');
        }
    };

    const handleTimeSlotClick = (timeSlot) => {

        if (courtTimeSlots.some(courtTimeSlot => courtTimeSlot.start_time === timeSlot.startTime && courtTimeSlot.end_time === timeSlot.endTime)) {
            return;
        }

        setSelectedTimeSlot(timeSlot.timeslotId);
    };


    return (
        <div>
            <h1>Add Court Time Slot</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTimeSlots">
                    <Form.Label>Time Slots</Form.Label>
                    <div className="time-slot-tags">
                        {Array.isArray(timeSlots) && timeSlots.map(timeSlot => (
                            <Card
                                key={timeSlot.timeslotId}
                                onClick={() => handleTimeSlotClick(timeSlot)}
                                className={`time-slot-tag ${selectedTimeSlot === timeSlot.timeslotId ? 'selected' : ''} ${courtTimeSlots.some(courtTimeSlot => courtTimeSlot.start_time === timeSlot.startTime && courtTimeSlot.end_time === timeSlot.endTime) ? 'disabled' : ''}`}

                            >
                                <Card.Body>
                                    <Card.Text className="text-center">
                                        {`${timeSlot.startTime} - ${timeSlot.endTime}`}
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        ))}
                    </div>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddCourtTimeSlot;
