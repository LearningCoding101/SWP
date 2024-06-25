import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../config/axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import { FaClock, FaWifi, FaUtensils, FaTshirt } from 'react-icons/fa';
import { Image, Typography, Space, Empty } from 'antd';

const CourtServices = () => {
  const [clubs, setClubs] = useState([]);
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get("/clubs", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        setClubs(shuffled.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchClubs();
  }, [accessToken]);

  return (
    <>
      <Container className='mb-2'>
        <Header title={'Our services'} />

        <Row>
          <h4 className='text-center'>
            Services at <span className='court-color'>BadCourts</span>
            <span className='gap-2'>
              <FaClock /> - 24-Hour Front Desk
            </span>
          </h4>
        </Row>
        <Row className="justify-content-md-center">
          {clubs.length > 0 ? (
            clubs.map((club) => (
              <Col key={club.id} xs={12} md={4} className="d-flex justify-content-center">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={club.picture_location} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{club.name}</Card.Title>
                    <Card.Text>
                      Open: {club.open_time} - {club.close_time}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Empty description="No clubs found." />
          )}
        </Row>
        <hr />
      </Container>
    </>
  )
}

export default CourtServices
