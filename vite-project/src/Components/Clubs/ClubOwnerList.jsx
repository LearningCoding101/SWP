import React, { useEffect, useState } from 'react'
import api from "../../config/axios";
import { Link } from 'react-router-dom';
import useGetParams from '../../assets/hooks/useGetParams';

const ClubOwnerList = () => {
  const [club, setClubs] = useState([]);
  // const param = useGetParams();
  // const clubId = param("id")
  const fetchClubs = async () => {
    try {
      const response = await api.get('/club');
      console.log(response.data)
      setClubs(response.data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };
  useEffect(() => {



    fetchClubs();
  }, []);

  return (
    <div className="club-details-container">
      {club ? (
        <div className="club-details">
          <img src={club.picture_location} alt={club.name} className="club-image" />
          <h2 className="club-name">{club.name}</h2>
          <p className="club-price">Price: ${club.price}</p>
          <p className="club-address">Address: {club.address}</p>
          <p className="club-time">
            Open Time: {club.open_time} - Close Time: {club.close_time}
          </p>
          <p className="club-owner">Owner: {club.ownerName}</p>
        </div>

      ) : (
        <p>No club data available.</p>
      )}
      <Link to={{
        pathname: `/clubUpdate/${club.clubId}`,
        state: { club }
      }} className="btn btn-warning">
        Update Club
      </Link>
      <Link to={{
        pathname: `/courtList/${club.clubId}`,
        state: { club }
      }} className="btn btn-warning">
        Show Courts
      </Link>
    </div >
  );
}

export default ClubOwnerList