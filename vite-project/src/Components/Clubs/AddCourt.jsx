import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../config/axios";
import { Button, Form } from 'react-bootstrap';

const AddCourt = () => {
    const { clubId } = useParams();
    const [courtName, setCourtName] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    useEffect(() => {

        api.get('/timeslots')
            .then(response => {
                if (response.data.length === 0) {
                    alert('No time slots available');
                } else {
                    setTimeSlots(response.data);
                }
            })
            .catch(error => console.error('Error fetching time slots:', error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const courtCreateRequest = { courtName };
            const response = await api.post(`/court/${clubId}`, courtCreateRequest);
            alert('Court created successfully');

            // Create a new court time slot with the selected time slot ID
            const courtTimeSlotRequest = { courtId: response.data.id, timeSlotId: selectedTimeSlot };
            await api.post('/courtTimeSlot', courtTimeSlotRequest);
            alert('Court time slot created successfully');
        } catch (error) {
            console.error('Error creating court or court time slot:', error);
            alert('Error creating court or court time slot');
        }
    };

    return (
        <div>
            <h1>Add Court</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicCourtName">
                    <Form.Label>Court Name</Form.Label>
                    <Form.Control type="text" value={courtName} onChange={(e) => setCourtName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicTimeSlot">
                    <Form.Label>Time Slot</Form.Label>
                    <Form.Control as="select" value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)}>
                        {timeSlots.length > 0 ? (
                            timeSlots.map(timeSlot => (
                                <option key={timeSlot.timeslotId} value={timeSlot.timeslotId}>
                                    {`${timeSlot.start_time} - ${timeSlot.end_time}`}
                                </option>
                            ))
                        ) : (
                            <option>No time slots available</option>
                        )}
                    </Form.Control>
                </Form.Group>
                <Button variant="warning" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddCourt;
