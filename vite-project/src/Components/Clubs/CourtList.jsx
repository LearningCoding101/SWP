import React, { useEffect, useState } from 'react';
import api from "../../config/axios";
import {useParams } from 'react-router-dom';
import { Card, Button, Pagination, Modal } from 'react-bootstrap';
import AddCourt from './AddCourt'; // Make sure the path is correct
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const CourtList = () => {
    const { clubId } = useParams();
    const [courts, setCourts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [courtsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [newCourtName, setNewCourtName] = useState('');

    console.log('Club ID:', clubId);

    const fetchCourts = async () => {
        try {
            const response = await api.get(`/court/${clubId}`);
            console.log(response.data);
            setCourts(response.data);
        } catch (error) {
            console.error('Error fetching courts:', error);
        }
    };
    const handleUpdateCourt = async () => {
        try {
            await api.put(`/court/${selectedCourt.id}`, { courtname: newCourtName });
            fetchCourts();
            setShowModal(false);
            window.location.reload();


        } catch (error) {
            console.error('Error updating court:', error);
        }
    };
    const deleteCourt = async (id) => {
        try {
            await api.delete(`/court/${id}`);
            fetchCourts();
        } catch (error) {
            console.error('Error deleting court:', error);
        }
    };

    useEffect(() => {
        fetchCourts();
    }, []);


    const indexOfLastCourt = currentPage * courtsPerPage;
    const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
    const currentCourts = courts.slice(indexOfFirstCourt, indexOfLastCourt);


    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Button variant="warning" onClick={() => setShowModal(true)}>
                    Add Courts
                </Button>
            </div>
            <div className="court-list-container d-flex flex-wrap justify-content-around">
                {currentCourts.length > 0 ? (
                    currentCourts.map((court) => (
                        <Card style={{ width: '18rem' }} key={court.id} className="m-3">
                            <Card.Body>
                                <Card.Title>{court.courtName}</Card.Title>
                                <Card.Text>
                                    Club: {court.clubName}
                                </Card.Text>
                                <Link to={`/showBooking/${court.id}`} className="btn btn-warning">View Booking</Link>
                                <Link to={`/clubManage/courtList/CourtsDetail/${court.id}`} className="btn btn-warning">View Court Time Slots</Link>
                                <Button className="btn btn-warning" onClick={() => deleteCourt(court.id)}>Delete Court</Button>
                                <Button className="btn btn-warning" onClick={() => { setShowModal1(true); setSelectedCourt(court); setNewCourtName(court.courtName); }}>Update Court Name</Button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No court data available.</p>
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination>
                    {Array(Math.ceil(courts.length / courtsPerPage)).fill().map((_, idx) => (
                        <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => paginate(idx + 1)}>
                            {idx + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
            <Modal show={showModal1} onHide={() => { setShowModal1(false); setNewCourtName(''); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Court Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>New Court Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter new court name" value={newCourtName} onChange={(e) => setNewCourtName(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowModal1(false); setNewCourtName(''); }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateCourt}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Courts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddCourt onClose={() => setShowModal(false)} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CourtList;
