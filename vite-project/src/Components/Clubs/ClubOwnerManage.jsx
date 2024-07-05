// import React, { useEffect, useState } from "react";
// import api from "../../config/axios";
// import { Link } from "react-router-dom";
// import useGetParams from "../../assets/hooks/useGetParams";
// import "../css/ClubOwnerManage.css";
// const ClubOwnerManage = () => {
//   const [club, setClubs] = useState([]);
//   // const param = useGetParams();
//   // const clubId = param("id")
//   const fetchClubs = async () => {
//     try {
//       const response = await api.get("/club");
//       console.log(response.data);
//       setClubs(response.data);
//     } catch (error) {
//       console.error("Error fetching clubs:", error);
//     }
//   };
//   useEffect(() => {
//     fetchClubs();
//   }, []);

//   return (
//     <div className="club-details-container">
//       <div className="navbar">
//         <Link
//           to={{
//             pathname: `/clubManage/clubUpdate/${club.clubId}`,
//             state: { club },
//           }}
//           className="nav-link"
//         >
//           Update Club
//         </Link>
//         <Link
//           to={{
//             pathname: `/StaffBooking/${club.clubId}`,
//             state: { club },
//           }}
//           className="nav-link"
//         >
//           Booking
//         </Link>

//         <Link
//           to={{
//             pathname: `/RevenueChart/${club.clubId}`,
//             state: { club },
//           }}
//           className="nav-link"
//         >
//           Revenue Chart
//         </Link>

//         <Link
//           to={{
//             pathname: `/clubManage/courtList/${club.clubId}`,
//             state: { club },
//           }}
//           className="nav-link"
//         >
//           Show Courts
//         </Link>
//       </div>
//       {club ? (
//         <div className="club-details">
//           <img
//             src={club.picture_location}
//             alt={club.name}
//             className="club-image"
//           />
//           <h2 className="club-name">{club.name}</h2>
//           <p className="club-price">Price: {club.price} VND/hr</p>
//           <p className="club-address">Address: {club.address}</p>
//           <p className="club-time">
//             Open Time: {club.open_time} - Close Time: {club.close_time}
//           </p>
//           <p className="club-owner">Owner: {club.ownerName}</p>
//         </div>

//       ) : (
//         <p>No club data available.</p>
//       )}
//     </div>
//   );
// };

// export default ClubOwnerManage;

import React, { useEffect, useState } from 'react';
import { Layout, Menu, Row, Col, Card, Image, Typography, List, Breadcrumb, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import api from '../../config/axios'; // Assuming your API client

const ClubOwnerManage = () => {
  const [club, setClub] = useState(null);
  const { clubId } = useParams(); // Get club ID from URL parameters

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await api.get(`/club`); // Use club ID
        setClub(response.data);
      } catch (error) {
        console.error('Error fetching club details:', error);
      }
    };

    fetchClub();
  }, [clubId]);

  if (!club) {
    return <Typography.Text>Loading club details...</Typography.Text>;
  }

  // const { name, pictureLocation, price, address, openTime, closeTime, ownerName } = club;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Replace with your actual admin dashboard sider menu */}
      <Layout.Sider>
        <Menu theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          {/* Add more menu items as needed */}
        </Menu>
      </Layout.Sider>

      <Layout>
        <Layout.Header style={{ padding: 0, background: '#fff' , textAlign: 'center', fontFamily: 'fantasy'}}>
    Court Owner's workspace
        </Layout.Header>

        <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Card title="Club Details" bordered={true}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12} lg={8}>
                <Image src={club.picture_location} alt={name} width="100%" />
              </Col>
              <Col xs={24} md={12} lg={16}>
                <Typography.Title level={4}>{name}</Typography.Title>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { title: 'Price', content: `${club.price} VND/hr` },
                    { title: 'Address', content: club.address },
                    { title: 'Open Time', content: `${club.open_time} - ${club.close_time}` },
                    { title: 'Owner', content: club.ownerName },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta title={item.title} />
                      {item.content}
                    </List.Item>
                  )}
                />
                <div className="club-actions">
                  {/* Action Links (replace with Ant Design components) */}
                  <Link to={`/clubManage/clubUpdate/${club.clubId}`}>
                    <Button type="primary">Update Club</Button>
                  </Link>
                  <Link to={`/StaffBooking/${club.clubId}`}>
                    <Button>Booking</Button>
                  </Link>
                  <Link to={`/RevenueChart/${club.clubId}`}>
                    <Button>Revenue Chart</Button>
                  </Link>
                  <Link to={`/clubManage/courtList/${club.clubId}`}>
                    <Button>Show Courts</Button>
                  </Link>
                  <Link to={`/staff`}>
                    <Button>Check-in</Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Card>
        </Layout.Content>

        {/* Replace with your actual admin dashboard footer */}
        <Layout.Footer style={{ textAlign: 'center' }}>Your Admin Dashboard Footer</Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default ClubOwnerManage;

