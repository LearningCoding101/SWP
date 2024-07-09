import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../config/axios";
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import '../css/AddCourt.css'; // Import CSS for styling the tags

const AddCourt = ({ onClose, onCourtAdded }) => {
    const { clubId } = useParams();
    const [numberOfCourts, setNumberOfCourts] = useState(1);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

    useEffect(() => {
        api.get('/timeslots')
            .then(response => {
                let data = response.data;

                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    } catch (error) {
                        console.error('Error parsing string response to JSON:', error);
                    }
                }

                if (typeof data === 'object') {
                    setTimeSlots(data);
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
            onClose();
            onCourtAdded(); // Call the onCourtAdded function after a new court is added
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
        <Container className="add-court-container">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicNumberOfCourts">
                    <Form.Label>Number of Courts</Form.Label>
                    <Form.Control
                        type="number"
                        value={numberOfCourts}
                        onChange={(e) => setNumberOfCourts(e.target.value)}
                        min="1"
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTimeSlots" className="my-4">
                    <Form.Label>Time Slots</Form.Label>
                    <Row className="time-slot-tags">
                        {Array.isArray(timeSlots) && timeSlots.map(timeSlot => (
                            <Col xs={6} md={4} lg={3} key={timeSlot.timeslotId}>
                                <Card
                                    onClick={() => handleTimeSlotClick(timeSlot.timeslotId)}
                                    className={`time-slot-tag ${selectedTimeSlots.includes(timeSlot.timeslotId) ? 'selected' : ''}`}
                                >
                                    <Card.Body>
                                        <Card.Text className="text-center">
                                            {`${timeSlot.startTime} - ${timeSlot.endTime}`}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Form.Group>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default AddCourt;
