import React, { useState, useEffect } from 'react'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import api from '../../config/axios';
function ClubDetail() {
  const [clubDetail, setClubDetail] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await api.get("/club")
        console.log('Club data', data.data);
        setClubDetail(data.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetch()
  }, [])

  const clubId = useParams();
  const newClub = clubDetail.find(obj => {
    return obj.id == clubId.id
  })


  return (
    <div>
      <NavBar />
      <div className='container-fluid'>
        <p>{newClub.name}</p>
        <p>{newClub.address}</p>
        <p>{newClub.open_time}</p>
        <p>{newClub.close_time}</p>
        <p>{newClub.picture_location}</p>
      </div>
      <Footer />
    </div>
  )
}

export default ClubDetail