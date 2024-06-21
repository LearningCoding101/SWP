import React, { useEffect, useState } from 'react';
import api from "../../config/axios";
import { useParams } from 'react-router-dom';
import { Card, Button, Pagination } from 'react-bootstrap'; // Import Bootstrap components

const CourtList = () => {
    const { clubId } = useParams();
    const [courts, setCourts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [courtsPerPage] = useState(10); // Set the number of courts per page

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

    const deleteCourt = async (id) => {
        try {
            await api.delete(`/court/${id}`);
            fetchCourts(); // Refresh the courts list after deletion
        } catch (error) {
            console.error('Error deleting court:', error);
        }
    };

    useEffect(() => {
        fetchCourts();
    }, []);

    // Get current courts
    const indexOfLastCourt = currentPage * courtsPerPage;
    const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
    const currentCourts = courts.slice(indexOfFirstCourt, indexOfLastCourt);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="court-list-container d-flex flex-wrap justify-content-around">
            {currentCourts.length > 0 ? (
                currentCourts.map((court) => (
                    <Card style={{ width: '18rem' }} key={court.id} className="m-3">
                        <Card.Body>
                            <Card.Title>{court.courtName}</Card.Title>
                            <Card.Text>
                                Club: {court.clubName}
                            </Card.Text>
                            <Button className="btn btn-warning">Go somewhere</Button>
                            <Button className="btn btn-danger" onClick={() => deleteCourt(court.id)}>Delete Court</Button>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No court data available.</p>
            )}
            <Pagination>
                {Array(Math.ceil(courts.length / courtsPerPage)).fill().map((_, idx) => (
                    <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => paginate(idx + 1)}>
                        {idx + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
}

export default CourtList;
