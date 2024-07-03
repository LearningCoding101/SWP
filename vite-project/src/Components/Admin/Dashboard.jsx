import React, { useEffect, useState } from "react";
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
} from "@ant-design/icons";
import AddClubCombo from "./AddClubCombo";
import BookingReport from "./BarChart";
import UserManage from "./UserManage";
import ManageClub from "./ManageClub";
import api from "../../config/axios";

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
  getItem("Income Analysis", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Manage Users", "12", <UserOutlined />),
  getItem("Manage Club", "10", <DesktopOutlined />),
  getItem("Bar Chart Demo", "11", <UserOutlined />),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingTypes, setBookingTypes] = useState([]);
  const [selectedBookingType, setSelectedBookingType] = useState(null);
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const filteredItems = items.filter(
    (item) =>
      item.key === "1" ||
      item.key === "10" ||
      item.key === "11" ||
      item.key === "12"
  );

  const handleLogout = () => {
    console.log("Logged out");
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
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Badcourts ©{new Date().getFullYear()}. All rights reserved
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
  );
};

export default Dashboard;
