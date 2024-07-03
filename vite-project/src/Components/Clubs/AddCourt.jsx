import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../config/axios";
import { Button, Form } from 'react-bootstrap';
import '../css/AddCourt.css'; // Import CSS for styling the tags

const AddCourt = () => {
    const { clubId } = useParams();
    const [numberOfCourts, setNumberOfCourts] = useState(1);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

    useEffect(() => {
        api.get('/timeslots')
            .then(response => {
                console.log('Raw response:', response); // Log the raw response

                let data = response.data;

                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    } catch (error) {
                        console.error('Error parsing string response to JSON:', error);
                    }
                }

                console.log('Parsed data:', data); // Log the parsed data

                if (typeof data === 'object') {
                    setTimeSlots(data);
                    console.log('Fetched time slots:', data); // Log the fetched time slots
                } else {
                    console.error('API response is not an object or array:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching time slots:', error);
                setTimeSlots([]); // Set to empty array on error
            });
    }, []);





    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const courtCreateRequestCombo = { numberofcourt: numberOfCourts, tsid: selectedTimeSlots };
            console.log('Request payload:', courtCreateRequestCombo);
            await api.post(`court/manycourts/${clubId}`, courtCreateRequestCombo);
            alert('Courts created successfully');
        } catch (error) {
            console.error('Error creating courts:', error);
            alert('Error creating courts');
        }
    };

    const handleTimeSlotClick = (timeSlotId) => {
        setSelectedTimeSlots(prevSelectedTimeSlots => {
            if (prevSelectedTimeSlots.includes(timeSlotId)) {
                return prevSelectedTimeSlots.filter(id => id !== timeSlotId);
            } else {
                return [...prevSelectedTimeSlots, timeSlotId];
            }
        });
    };

    return (
        <div>
            <h1>Add Courts</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicNumberOfCourts">
                    <Form.Label>Number of Courts</Form.Label>
                    <Form.Control type="number" value={numberOfCourts} onChange={(e) => setNumberOfCourts(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicTimeSlots">
                    <Form.Label>Time Slots</Form.Label>
                    <div className="time-slot-tags">
                        {Array.isArray(timeSlots) && timeSlots.map(timeSlot => (
                            <span
                                key={timeSlot.timeslotId}
                                onClick={() => handleTimeSlotClick(timeSlot.timeslotId)}
                                className={`time-slot-tag ${selectedTimeSlots.includes(timeSlot.timeslotId) ? 'selected' : ''}`}
                            >
                                {`${timeSlot.startTime} - ${timeSlot.endTime}`}
                            </span>
                        ))}
                    </div>
                </Form.Group>
                <Button variant="warning" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddCourt;
