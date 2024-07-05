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

import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Image,
  Typography,
  List,
  Breadcrumb,
  Button,
  Dropdown,
} from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import api from "../../config/axios"; // Assuming your API client
import QRScanner from "../QRCheckin/StaffPage";
import StaffBookingForm from "../BookingForm/StaffBookingForm";
import RevenueChart from "./RevenueChart";

const ClubOwnerManage = () => {
  const [club, setClub] = useState(null);
  const [selectedKey, setSelectedKey] = useState("1");
  const { clubId } = useParams(); // Get club ID from URL parameters
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const handleAccountClick = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const accountMenu = (
    <Menu>
      {isLoggedIn ? (
        <>
          <Menu.Item>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              Profile
            </Link>
          </Menu.Item>
          {/* {userRole === "CUSTOMER" && (
            <Menu.Item>
              <Link to="/bookingHistory" style={{ textDecoration: "none" }}>
                History
              </Link>
            </Menu.Item>
          )} */}
        </>
      ) : (
        <Menu.Item>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await api.get(`/club`); // Use club ID
        setClub(response.data);
      } catch (error) {
        console.error("Error fetching club details:", error);
      }
    };

    fetchClub();
  }, [clubId]);

  if (!club) {
    return <Typography.Text>Loading club details...</Typography.Text>;
  }

  // const { name, pictureLocation, price, address, openTime, closeTime, ownerName } = club;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Replace with your actual admin dashboard sider menu */}
      <Layout.Sider>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          mode="inline"
          onClick={({ key }) => setSelectedKey(key)}
        >
          <Menu.Item key="1">Dashboard</Menu.Item>
          {/* Add more menu items as needed */}
          <Menu.Item key="2">Check In</Menu.Item>
          <Menu.Item key="3">Booking</Menu.Item>
          <Menu.Item key="4">Revenue Chart</Menu.Item>
        </Menu>
      </Layout.Sider>

      <Layout>
        <Layout.Header
          style={{
            padding: 0,
            background: "#fff",
            textAlign: "center",
            fontFamily: "fantasy",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div></div>
          <div>Court Owner's workspace</div>
          <Dropdown
            overlay={accountMenu}
            trigger="click"
            placement="bottomRight"
          >
            <Button.Group>
              <Button
                type="ghost"
                onClick={handleAccountClick}
                style={{ fontSize: "24px" }}
              >
                {isLoggedIn ? <UserOutlined /> : <UserOutlined />}
                <DownOutlined />
              </Button>
            </Button.Group>
          </Dropdown>
        </Layout.Header>

        <Layout.Content style={{ padding: "0 24px", minHeight: 280 }}>
          {selectedKey === "1" && (
            <Card title={club.name} bordered={true}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12} lg={8}>
                  <Image src={club.picture_location} alt={name} width="100%" />
                </Col>
                <Col xs={24} md={12} lg={16}>
                  <Typography.Title level={4}>{name}</Typography.Title>
                  <List
                    itemLayout="horizontal"
                    dataSource={[
                      { title: "Price", content: `${club.price} VND/hr` },
                      { title: "Address", content: club.address },
                      {
                        title: "Open Time",
                        content: `${club.open_time} - ${club.close_time}`,
                      },
                      { title: "Owner", content: club.ownerName },
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
                    {/* <Link to={`/StaffBooking/${club.clubId}`}>
                      <Button>Booking</Button>
                    </Link>
                    <Link to={`/RevenueChart/${club.clubId}`}>
                      <Button>Revenue Chart</Button>
                    </Link> */}
                    <Link to={`/clubManage/courtList/${club.clubId}`}>
                      <Button>Show Courts</Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card>
          )}

          {selectedKey === "2" && <QRScanner />}

          {selectedKey === "3" && <StaffBookingForm id={club.clubId} />}

          {selectedKey === "4" && <RevenueChart clubId={club.clubId} />}
        </Layout.Content>

        {/* Replace with your actual admin dashboard footer */}
        <Layout.Footer style={{ textAlign: "center" }}>
          Your Admin Dashboard Footer
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default ClubOwnerManage;
