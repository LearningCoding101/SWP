


import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Layout, Menu, Form, message, theme, Row, Col } from 'antd';
import api from "../../config/axios";
const { Header, Content, Footer, Sider } = Layout;

const Logout = () => {
  const [form] = Form.useForm();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const loginUserName = localStorage.getItem('userName');
  const loginEmail = localStorage.getItem('userEmail');

  const onChangePassword = async (values) => {
    const payload = {
        password: values.newPassword
    }
    try {
      // Make the POST request
      const response = await api.post("/reset-password", payload);
      console.log(response)
      // Handle response here
      message.success("Reset successful!");
    } catch (error) {
      // Handle error here
      console.error("Error occurred:", error);
      message.error("An unknown error occurred. Please try again.");
    }
  };

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/");
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Content
        style={{
          padding: '48px',
        }}
      >
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
              width: 200,
              display: 'flex', // Added flexbox for Sider layout
              flexDirection: 'column', // Stack elements vertically
              justifyContent: 'space-between', // Align content at top and bottom
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{
                height: 'calc(100% - 50px)', // Adjust height for button placement
              }}
              items={[
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'User Profile',
                },
              ]}
            />

            {/* Logout Button with Styles */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Button type="danger" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Sider>
          <Content
            style={{
              padding: '24px',
              minHeight: 280,
              height: '100%',
            }}
          >
            <h4>Account Detail</h4>
            <p className="dropdown-item">
              Username: {loginUserName}
            </p>
            <p className="dropdown-item">
              Email: {loginEmail}
            </p>

            {/* Added Input Fields */}
            <h4 style={{ marginTop: 100 }}>Change password </h4>
            <Form
              layout="vertical"
              form={form}
              name="bookingForm"
              onFinish={onChangePassword}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Form.Item
                    label="New password"
                    name="newPassword"
                    rules={[
                      { required: true, message: "Please input your new password!" },
                    ]}
                  >
                    <Input.Password
                      placeholder="Enter new password"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Form.Item
                    label="Confirm new password"
                    name="passwordConfirm"
                    rules={[
                      { required: true, message: "Please confirm your new password!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Password does not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm new password"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Logout;
