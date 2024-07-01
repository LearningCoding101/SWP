import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import HeaderMain from '../layout/HeaderMain.jsx'
import Parallax from '../common/Parallax.jsx'
import NavBar from '../layout/NavBar.jsx';
import Footer from '../layout/Footer.jsx';
import CourtServices from './../common/CourtServices';

const Home = () => {
  const location = useLocation()
  return (
    <>
    <div>
      <NavBar/>
      <section>
        <HeaderMain />
        <div className='container-fluid' style={{margin: "40px 0"}}>
          <CourtServices/>      
        </div> 
      </section>
    
    </div>
    {/* <Footer /> */}
    </>
  )
}

export default Home


