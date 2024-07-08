import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import HeaderMain from '../layout/HeaderMain.jsx'
import Parallax from '../common/Parallax.jsx'
import NavBar from '../layout/NavBar.jsx';
import Footer from '../layout/Footer.jsx';
import CourtServices from './../common/CourtServices';
import SearchNavBar from './../layout/SearchNavBar';
import AppFooter from '../layout/Footer.jsx';




const Home = () => {
  const location = useLocation()
  return (
    <>
      <div>
        <SearchNavBar />
        <section>
          <HeaderMain />
          <div className='container-fluid' style={{ margin: "40px 0" }}>
            <h3 className='text-center' style={{marginBottom: 30}}>Lastest clubs</h3>
            <CourtServices />
          </div>
        </section>
        <footer>
          <AppFooter />
        </footer>
      </div>

    </>
  )
}

export default Home


