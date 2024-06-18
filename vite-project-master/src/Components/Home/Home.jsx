import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import HeaderMain from '../layout/HeaderMain.jsx'
import Parallax from '../common/Parallax.jsx'
import CourtServices from '../common/CourtServices';
import NavBar from '../layout/NavBar.jsx';
import Footer from '../layout/Footer.jsx';

const Home = () => {
  const location = useLocation()

  const message = location.state && location.state.message
  const currentUser = localStorage.getItem("userName")
  return (
    <div>
      <NavBar/>
      <section>
        {message && <p className="text-warning px-5">{message}</p>}
        {currentUser && (
          <h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
        )}
        
        <HeaderMain />
        <div className='container'>
          <Parallax />
          <CourtServices />
          <Parallax />
         
        </div> 
      </section>
    <Footer />
    </div>
  )
}

export default Home





// import React from "react";
// import { Carousel, Row, Col, Button, Image } from "antd";

// const Home = () => {
//   return (
//     <div className="homepage">
//       <Carousel autoplay>
//         <div>
//           <Image
//             src={"https://firebasestorage.googleapis.com/v0/b/projectswp-9019a.appspot.com/o/badminton1.jpg?alt=media&token=d29801d4-73f7-4f15-9881-7e20bce51465"}
//             alt="Badminton Action"
//             preview={false} // Disable image preview on hover
//             width="100%"
//           />
//         </div>
//         <div>
//           <Image
//             src={"https://firebasestorage.googleapis.com/v0/b/projectswp-9019a.appspot.com/o/badmintion2.jpg?alt=media&token=ef995ff2-9cc7-4b23-b7af-31c79a782f4b"}
//             alt="Badminton Court"
//             preview={false}
//             width="100%"
//           />
//         </div>
//         <div>
//           <Image
//             src={"https://firebasestorage.googleapis.com/v0/b/projectswp-9019a.appspot.com/o/badminton3.jpg?alt=media&token=4ef92b3c-3a24-4ba3-88dc-253760e88c55"}
//             alt="Badminton Coaching"
//             preview={false}
//             width="100%"
//           />
//         </div>
//       </Carousel>

//       <Row gutter={[16, 16]} className="mt-4">
//         <Col xs={24} md={12}>
//           <h2>Elevate Your Game</h2>
//           <p>
//             Welcome to BadCourts, your one-stop shop for all things badminton!
//             Whether you're a seasoned pro or just starting out, we have the
//             facilities, equipment, and resources to help you take your game to
//             the next level.
//           </p>
//           <Button type="primary" size="large">
//             Book Your Court Now
//           </Button>
//         </Col>
//         <Col xs={24} md={12}>
//           <h2>Why Choose BadCourts?</h2>
//           <ul>
//             <li>High-quality badminton courts with advanced lighting</li>
//             <li>A wide range of equipment rentals for all skill levels</li>
//             <li>Professional coaching and training programs</li>
//             <li>A vibrant community of badminton enthusiasts</li>
//           </ul>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Home;
