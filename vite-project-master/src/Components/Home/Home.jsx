import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import HeaderMain  from '../layout/HeaderMain.jsx'
import CourtServices from '../../common/CourtServices';
import Parallax  from '../../common/Parallax.jsx'
const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/courts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <section>
        <HeaderMain/>
        <section className='container'>
          <Parallax/>
          <CourtServices/>
          <Parallax/>
        </section>
      </section>
    <Link to ="/login">Login</Link>
    <h1>Data from Backend</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
   </div>
  )
}

export default Home