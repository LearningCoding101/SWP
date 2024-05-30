import React from 'react'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';
const Parallax = () => {
    return (
        <div className='parallax mb-5'>
            <Container className='text-center px-5 py-5 justify-content-center'>
                <div className='animated-texts bounceIn'>
                   <h1> Welcome to <span className='court-color'>BadCourts</span></h1>
                </div>
                <h3>We offer the best services for all your needs</h3>
            </Container>
        </div>
    )
}

export default Parallax