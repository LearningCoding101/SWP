// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { Button, Dropdown, Menu, Select, Space } from "antd";
// import { UserOutlined, DownOutlined } from "@ant-design/icons";
// import Logout from "../Login/Logout"; // Assuming Logout component handles logout functionality
// import { Input } from "antd";

// const { Search } = Input;

// const SearchNavBar = () => {
//   const [showAccountDropdown, setShowAccountDropdown] = useState(false);

//   const handleAccountClick = () => {
//     setShowAccountDropdown(!showAccountDropdown);
//   };

//   const options = [
//     {
//       value: "searchName",
//       label: "Search Name",
//     },
//     {
//       value: "searchStartTime",
//       label: "Search Start Time",
//     },
//   ];

//   const isLoggedIn = localStorage.getItem("token");
//   const userRole = localStorage.getItem("userRole");

//   const accountMenu = (
//     <Menu>
//       {isLoggedIn ? (
//         <>
//           <Menu.Item>
//             <Link to="/profile" style={{ textDecoration: "none" }}>
//               Profile
//             </Link>
//           </Menu.Item>
//           <Menu.Item>
//             <Link to="/feedback" style={{ textDecoration: "none" }}>
//               Feedback Demo
//             </Link>
//           </Menu.Item>
//           {userRole === "CUSTOMER" && (
//             <Menu.Item>
//               <Link to="/bookingHistory" style={{ textDecoration: "none" }}>
//                 History
//               </Link>
//             </Menu.Item>
//           )}
//         </>
//       ) : (
//         <Menu.Item>
//           <Link to="/login" style={{ textDecoration: "none" }}>
//             Login
//           </Link>
//         </Menu.Item>
//       )}
//     </Menu>
//   );

//   return (
//     <nav className="navbar bg-white shadow-sm fixed-top d-flex justify-content-between align-items-center">
//       <div className="container-fluid">
//         {/* Logo */}
//         <Link to="/" className="navbar-brand text-primary">
//           <img
//             src="https://firebasestorage.googleapis.com/v0/b/projectswp-9019a.appspot.com/o/logo.png?alt=media&token=ec0e9108-2b09-4c86-8b6e-407fb1269a3b"
//             style={{
//               width: "60px",
//               height: "50px",
//               marginLeft: "30px",
//               display: "fixed",
//             }}
//           ></img>
//         </Link>

//         {/* Navigation Links (left-aligned) */}
//         {/* <ul className="nav mb-2 mb-lg-0">
//           {isLoggedIn && userRole === "ClUB_OWNER" && (
//             <li className="nav-item">
//               <NavLink
//                 to="/clubManage"
//                 className={({ isActive }) =>
//                   isActive ? "nav-link active text-primary" : "nav-link"
//                 }
//               >
//                 Manage Club
//               </NavLink>
//             </li>
//           )}
//           <li className="nav-item">
//             <NavLink
//               to="/clubs"
//               className={({ isActive }) =>
//                 isActive ? "nav-link active text-primary" : "nav-link"
//               }
//             >
//               All clubs
//             </NavLink>
//           </li>
//           {isLoggedIn && userRole === "ADMIN" && (
//             <li className="nav-item">
//               <NavLink
//                 to="/adminDashboard"
//                 className={({ isActive }) =>
//                   isActive ? "nav-link active text-primary" : "nav-link"
//                 }
//               >
//                 Admin
//               </NavLink>
//             </li>
//           )}
//           {isLoggedIn && userRole === "ADMIN" && (
//             <li className="nav-item">
//               <NavLink
//                 to="/AddClubCombo"
//                 className={({ isActive }) =>
//                   isActive ? "nav-link active text-primary" : "nav-link"
//                 }
//               >
//                 CRUD Demo hahaha
//               </NavLink>
//             </li>
//           )}
//         </ul> */}

//         <Space direction="vertical" size="middle">
//           <Space.Compact>
//             <Select
//               defaultValue="searchName"
//               style={{ height: 39.9 }}
//               options={options}
//             />
//             {/* <Search
//               placeholder="input search text"
//               enterButton
//               size="large"
//               // onSearch={onSearch}
//               style={{ maxWidth: 400 }}
//             /> */}
//             <Input placeholder="Enter text to search" />
//           </Space.Compact>
//         </Space>

//         {/* Account Dropdown (right-aligned) */}
//         <Dropdown overlay={accountMenu} trigger="click" placement="bottomRight">
//           <Button.Group>
//             <Button type="ghost" onClick={handleAccountClick}>
//               {isLoggedIn ? <UserOutlined /> : <UserOutlined />}
//               <DownOutlined />
//             </Button>
//           </Button.Group>
//         </Dropdown>
//       </div>

//       {/* Added a spacer div below the navbar */}
//       <div className="navbar-spacer"></div>
//     </nav>
//   );
// };

// export default SearchNavBar;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu, Select, Space, Input, Empty } from "antd";
import { UserOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import api from "../../config/axios";

const { Search } = Input;

const SearchNavBar = () => {
  const accessToken = localStorage.getItem("token")
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [clubName, setClubName] = useState("");
  const navigate = useNavigate()

  const handleAccountClick = () => {
    setShowAccountDropdown(!showAccountDropdown);
  };

  const handleSearch = async() => {
    // Perform API call with clubName
    // if (clubName) {
    //   const apiUrl = `http://badcourts.click:8080/api/clubs?name=${clubName}`;
    //   // Here you would make your API call using fetch or axios
    //   console.log("API URL:", apiUrl);
    // }
    // try {
    //   if (clubName) {
    //   const response = await api.get(`/clubs?name=${clubName}`, {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   });
      navigate(`/clubs/${clubName}`)
    // }
    // else{
    //   <Empty description="No clubs found." />
    // }
    // } catch (error) {
    //   console.error("Error fetching clubs:", error);
    // }
  };

  const options = [
    {
      value: "searchName",
      label: "Search Name",
    },
    {
      value: "searchStartTime",
      label: "Search Start Time",
    },
  ];

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
          <Menu.Item>
            <Link to="/feedback" style={{ textDecoration: "none" }}>
              Feedback Demo
            </Link>
          </Menu.Item>
          {userRole === "CUSTOMER" && (
            <Menu.Item>
              <Link to="/bookingHistory" style={{ textDecoration: "none" }}>
                History
              </Link>
            </Menu.Item>
          )}
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

  return (
    <nav className="navbar bg-white shadow-sm fixed-top d-flex justify-content-between align-items-center">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand text-primary">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/projectswp-9019a.appspot.com/o/logo.png?alt=media&token=ec0e9108-2b09-4c86-8b6e-407fb1269a3b"
            style={{
              width: "60px",
              height: "50px",
              marginLeft: "30px",
              display: "fixed",
            }}
            alt="Logo"
          />
        </Link>

        {/* Search Input and Button */}
        <Space direction="vertical" size="middle">
          <Space>
            {/* <Select defaultValue="searchName" style={{ width: 120 }}>
              {options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select> */}
            <Search
              placeholder="Enter text to search"
              allowClear
              enterButton={<Button onClick={handleSearch}><SearchOutlined /></Button>}
              size="middle"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />
          </Space>
        </Space>

        {/* Account Dropdown (right-aligned) */}
        <Dropdown overlay={accountMenu} trigger="click" placement="bottomRight">
          <Button.Group>
            <Button type="ghost" onClick={handleAccountClick}>
              {isLoggedIn ? <UserOutlined /> : <UserOutlined />}
              <DownOutlined />
            </Button>
          </Button.Group>
        </Dropdown>
      </div>

      {/* Spacer div below the navbar */}
      <div className="navbar-spacer"></div>
    </nav>
  );
};

export default SearchNavBar;
