

import React, { useState, useEffect } from "react";
import {
  List,
  Card,
  Image,
  Typography,
  Button,
  Space,
  Empty,
  Rate,
  Select,
  Input,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import api from "../../config/axios";

const Club = () => {
  const options = [
    {
      value: "searchName",
      label: "Search Name",
    },
    {
      value: "searchStartTime",
      label: "Search Start Time",
    },
    {
      value: "searchAddress",
      label: "Search Address",
    },
  ];

  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [searchType, setSearchType] = useState("searchName");
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await api.get("/clubs", {
          headers: { Authorization: `Bearer ${accessToken}` }, // Assuming token-based auth
        });
        setClubs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClubs();
  }, [accessToken]);

  const renderClubList = (club) => (
    <List.Item key={club.id}>
      <List.Item.Meta
        avatar={
          <Image
            width={80}
            height={80}
            src={club.picture_location}
            alt={club.name}
          />
        }
        title={<Typography.Title level={4}>{club.name}</Typography.Title>}
        description={
          <Space direction="vertical">
            <Typography.Text>Address: {club.address}</Typography.Text>
            <Typography.Text>
              Open: {club.open_time} - {club.close_time}
            </Typography.Text>
            <Typography.Text>{club.price}VND/hour</Typography.Text>
            <Rate value={club.rating} />
            <Typography.Text>{club.feedbacks} reviews</Typography.Text>
          </Space>
        }
      />
      {userRole === "ClUB_OWNER" ? (
        <Link to={`/StaffBooking/${club.clubId}`}>
          <Button type="primary" size="small">
            Book Now
          </Button>
        </Link>
      ) : (
        <Link to={`/booking/${club.clubId}`}>
          <Button type="primary" size="small">
            Book Now
          </Button>
        </Link>
      )}
    </List.Item>
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
  };

  const filteredClubs = clubs.filter((club) => {
    if (searchType === "searchName") {
      return club.name.toLowerCase().includes(search);
    } else if (searchType === "searchStartTime") {
      return club.open_time.toLowerCase().includes(search);
    } else if (searchType === "searchAddress") {
      return club.address.toLowerCase().includes(search);
    }
    return false;
  });

  return (
    <div>
      <NavBar />
      <div className="container" style={{ marginTop: 100}}>
        <Space direction="vertical" size="middle">
          <Space.Compact>
            <Select
              defaultValue="searchName"
              style={{ height: 39.9 }}
              options={options}
              onChange={handleSearchTypeChange}
            />
            {/* <Search
              placeholder="input search text"
              enterButton
              size="large"
              // onSearch={onSearch}
              style={{ maxWidth: 400 }}
            /> */}
            <Input
              placeholder="Enter text to search"
              onChange={handleSearchChange}
              style={{ maxWidth: 400 }}
            />
          </Space.Compact>
        </Space>{" "}
        {/* Added a container class for better styling */}
        {filteredClubs.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={filteredClubs}
            renderItem={renderClubList}
            pagination={{ pageSize: 4 }} // Optional pagination configuration
          />
        ) : (
          <Empty description="No clubs found." />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Club;