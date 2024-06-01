import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card  from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import { FaClock, FaWifi, FaUtensils, FaTshirt } from 'react-icons/fa';

const CourtServices = () => {
    return (
        <>
            <Container classname='mb-2'>
                <Header title={'Our services'} />

                <Row>
                    <h4 className='text-center'>
                        Services at <span className='court-color'>BadCourts</span>
                        <span className='gap-2'>
                            <FaClock /> - 24-Hour Front Desk
                        </span>
                    </h4>
                </Row>
                <hr />

                <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='court-color'>
                                    <FaWifi /> Wifi
                                </Card.Title>
                                <Card.Text>
                                    Stay connected with high-speed internet access.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='court-color'>
                                    <FaUtensils /> Breakfast
                                </Card.Title>
                                <Card.Text>
                                    Star
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='court-color'>
                                    <FaTshirt /> Laundry
                                </Card.Title>
                                <Card.Text>
                                    Something is here
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CourtServices