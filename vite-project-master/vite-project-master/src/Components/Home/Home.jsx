import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import HeaderMain from '../layout/HeaderMain.jsx'
import Parallax from '../common/Parallax.jsx'
// import CourtCarousel from '../common/CourtCarousel.jsx';
import CourtServices from '../common/CourtServices';
const Home = () => {
  const location = useLocation()

  const message = location.state && location.state.message
  const currentUser = localStorage.getItem("userId")
  return (
    <div>
      <section>
        {message && <p className="text-warning px-5">{message}</p>}
        {currentUser && (
          <h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
        )}
        <HeaderMain />
        <div className='container'>
          {/* <CourtCarousel /> */}
          <Parallax />
          {/* <CourtCarousel /> */}
          <CourtServices />
          <Parallax />
          {/* <CourtCarousel />         */}
        </div>
      </section>
      {/* <Link to ="/login">Login</Link> */}

    </div>
  )
}

export default Home