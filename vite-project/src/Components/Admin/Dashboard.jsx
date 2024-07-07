// import React, { useState } from 'react';
// import { Layout, Menu, theme } from 'antd';
// import MyResponsiveLine from './LineGraph';
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import AddClubCombo from './AddClubCombo';
// import BookingReport from './BarChart';
// import UserManage from './UserManage';

// const { Header, Content, Footer, Sider } = Layout;

// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
// const items = [
//   // Existing menu items (key '1')
//   // ...
//   getItem('Income Analysis', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   // New menu items
//    getItem('Manage Users', '12', <UserOutlined />),
//   getItem('Add club', '10', <DesktopOutlined />),
//   getItem('Bar Chart Demo', '11', <UserOutlined />),
//  ];

// const Dashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedKey, setSelectedKey] = useState('1');
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   const filteredItems = items.filter((item) => item.key === '1' || item.key === '10' || item.key === '11'  || item.key === '12');

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
//         {/* Your Sider content */}

//         <Menu
//           theme="dark"
//           selectedKeys={[selectedKey]} // Highlight the selected item
//           mode="inline"
//           onClick={({ key }) => setSelectedKey(key)} // Update selectedKey on menu item click
//           items={filteredItems}
//         />
//       </Sider>
//       <Layout>
//         <Header style={{ padding: 0, background: colorBgContainer }} />
//         <Content style={{ margin: '0 16px' }}>
//           {/* Render relevant content based on selectedKey */}
//           {/* Example: */}
//           {selectedKey === '1' && <MyResponsiveLine />}
//           {selectedKey === '10' && <AddClubCombo />}
//           {selectedKey === '11' && <BookingReport />}
//           {selectedKey === '12' && <UserManage />}
//         </Content>
//         <Footer style={{ textAlign: 'center' }}>
//           Badcourts ©{new Date().getFullYear()}. All rights reserved
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;


import React, { useContext, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  theme,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import MyResponsiveLine from "./LineGraph";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
  LineChartOutlined, 
  BarChartOutlined,
   FundViewOutlined
} from "@ant-design/icons";
import AddClubCombo from "./AddClubCombo";
import BookingReport from "./BarChart";
import UserManage from "./UserManage";
import ManageClub from "./ManageClub";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Login/AuthProvider";
import PieChartComponent from './../ClubOwnerShowBooking/PieChart';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  // getItem("Booking Status", "13", <PieChartOutlined />),
  // getItem("Income Analysis", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />), 
  getItem("Manage Users", "12", <UserOutlined />),
  getItem("Manage Club", "10", <DesktopOutlined />),
  getItem("Chart", "sub1", <FundViewOutlined />, [
    getItem("Income Analysis", "1", <LineChartOutlined />),
    getItem("Bar Chart Demo", "11", <BarChartOutlined />),
    getItem("Booking Status", "13", <PieChartOutlined />),
  ]),

  // getItem("Bar Chart Demo", "11", <UserOutlined />),
];

const Dashboard = () => {
  const isLoggedIn = localStorage.getItem("token")
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("12");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingTypes, setBookingTypes] = useState([]);
  const [selectedBookingType, setSelectedBookingType] = useState(null);
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const filteredItems = items.filter(
     (item) => item.key === "10" || item.key === "12" || item.key === "sub1"
  );

  const handleLogout = () => {
    console.log("Logged out");
    auth.handleLogout();
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/booking-types");
        setBookingTypes(response.data);
      } catch (error) {
        console.error("Error fetching booking types:", error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const payload = {
      name: values.typeName,
      discount: values.discount,
    };

    try {
      await api.put(`/booking-types/${values.typeID}`, payload);
      message.success("Update success!");
    } catch (error) {
      message.error("An unknown error occurred, try again later.");
      console.error("Error updating booking type:", error);
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBookingTypeChange = (value) => {
    const selected = bookingTypes.find((bkt) => bkt.bookingTypeId === value);
    setSelectedBookingType(selected);
    form.setFieldsValue({
      typeName: selected.bookingTypeName,
      discount: selected.bookingDiscount,
    });
  };

  return (
    <>
      {isLoggedIn ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <Menu
              theme="dark"
              selectedKeys={[selectedKey]}
              mode="inline"
              onClick={({ key }) => setSelectedKey(key)}
              items={filteredItems}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginLeft: 16 }}>
                <Button
                  type="primary"
                  style={{ marginRight: 8 }}
                  onClick={showModal}
                >
                  Update Booking Type
                </Button>
              </div>
              <div>
                <Button
                  type="primary"
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  style={{ marginRight: 16 }}
                >
                  Logout
                </Button>
              </div>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              {selectedKey === "1" && <MyResponsiveLine />}
              {selectedKey === "10" && <ManageClub />}
              {selectedKey === "11" && <BookingReport />}
              {selectedKey === "12" && <UserManage />}
              {selectedKey === "13" && <PieChartComponent />}
            </Content>
            <Footer style={{ textAlign: "center" }}>
               ©{new Date().getFullYear()} Badcourts. All rights reserved
            </Footer>
          </Layout>

          <Modal
            title="Booking Type"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form layout="vertical" form={form}>
              <Form.Item
                label="Type ID"
                name="typeID"
                rules={[
                  { required: true, message: "Please select the booking type!" },
                ]}
              >
                <Select
                  placeholder="Select a Booking Type"
                  onChange={handleBookingTypeChange}
                >
                  {bookingTypes.map((bkt) => (
                    <Option key={bkt.bookingTypeId} value={bkt.bookingTypeId}>
                      {bkt.bookingTypeId}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Type Name"
                name="typeName"
                rules={[{ required: true, message: "Please input the type name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Discount"
                name="discount"
                rules={[{ required: true, message: "Please input the discount!" }]}
              >
                <InputNumber min={0} max={100} style={{ width: "100%" }} />
              </Form.Item>
            </Form>
          </Modal>
        </Layout>
      ) : (
        navigate('/')
      )}
    </>
  );
};

export default Dashboard;
