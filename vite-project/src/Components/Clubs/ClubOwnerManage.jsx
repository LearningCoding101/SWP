import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import useGetParams from "../../assets/hooks/useGetParams";
import "../css/ClubOwnerManage.css";
const ClubOwnerManage = () => {
  const [club, setClubs] = useState([]);
  // const param = useGetParams();
  // const clubId = param("id")
  const fetchClubs = async () => {
    try {
      const response = await api.get("/club");
      console.log(response.data);
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };
  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <div className="club-details-container">
      <div className="navbar">
        <Link
          to={{
            pathname: `/clubManage/clubUpdate/${club.clubId}`,
            state: { club },
          }}
          className="nav-link"
        >
          Update Club
        </Link>
        <Link
          to={{
            pathname: `/StaffBooking/${club.clubId}`,
            state: { club },
          }}
          className="nav-link"
        >
          Booking
        </Link>
        <Link
          to={{
            pathname: `/RevenueChart/${club.clubId}`,
            state: { club },
          }}
          className="nav-link"
        >
          RevenueChart
        </Link>
        <Link
          to={{
            pathname: `/clubManage/courtList/${club.clubId}`,
            state: { club },
          }}
          className="nav-link"
        >
          Show Courts
        </Link>
      </div>
      {club ? (
        <div className="club-details">
          <img
            src={club.picture_location}
            alt={club.name}
            className="club-image"
          />
          <h2 className="club-name">{club.name}</h2>
          <p className="club-price">Price: {club.price} VND/hr</p>
          <p className="club-address">Address: {club.address}</p>
          <p className="club-time">
            Open Time: {club.open_time} - Close Time: {club.close_time}
          </p>
          <p className="club-owner">Owner: {club.ownerName}</p>
        </div>

      ) : (
        <p>No club data available.</p>
      )}
    </div>
  );
};

export default ClubOwnerManage;
