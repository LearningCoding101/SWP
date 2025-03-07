import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Menu, Form, message, Row, Col } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from "../../config/axios";

const { Header, Content, Sider } = Layout;

const Logout = () => {
  const accessToken = localStorage.getItem("token");
  const isLoggedIn = !!accessToken;
  const userRole = localStorage.getItem("userRole")
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const loginEmail = localStorage.getItem('userEmail');
  const [userDetails, setUserDetails] = useState({ username: '', phone: '' });

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Full name is required'),
    phone: Yup.string().required('Phone is required'),
  });
  useEffect(() => {
    if (userRole === "ADMIN") {
      navigate('/error404');
    }
  }, [userRole, navigate])

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await api.get(`/account/${loginEmail}`);
        const responseData = response.data
        console.log(responseData)
        // setUserDetails({
        //   username: response.data.fullName,
        //   phone: response.data.phone,
        // });
        setUserDetails(response.data);
        form2.setFieldsValue({
          username: responseData.fullName,
          phone: responseData.phone,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAccountInfo();
  }, [loginEmail, form]);

  const handleSave = async (values, actions) => {
    const payloadData = {
      fullName: values.username,
      phone: values.phone,
    };
    try {
      const response = await api.put('/updateNameAndPhone', payloadData);
      console.log(response.data)
      setUserDetails(response.data);
      message.success('User details saved successfully!');
    } catch (error) {
      console.error('Error saving user details:', error);
      message.error('An error occurred while saving user details.');
    }
    actions.setSubmitting(false);
  };

  const onChangePassword = async (values) => {
    const payload = {
      password: values.newPassword,
    };
    try {
      const response = await api.post("/reset-password", payload);
      message.success("Reset successful!");
    } catch (error) {
      console.error("Error occurred:", error);
      message.error("An unknown error occurred. Please try again.");
    }
  };

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <Layout style={{ height: '100vh' }}>
          <Content
            style={{
              padding: '48px',
            }}
          >
            <Layout
              style={{
                padding: '24px 0',
                background: '#fff',
                borderRadius: '8px',
              }}
            >
              <Sider
                style={{
                  background: '#fff',
                  width: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  style={{
                    height: 'calc(100% - 50px)',
                  }}
                  items={[
                    {
                      key: '1',
                      icon: <UserOutlined />,
                      label: 'User Profile',
                    },
                  ]}
                />
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
                <p>Email: {loginEmail}</p>
                <Formik
                  initialValues={userDetails}
                  enableReinitialize
                  validationSchema={validationSchema}
                  onSubmit={handleSave}
                >
                  {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                    <Form layout="vertical" form={form2} onFinish={handleSubmit}>
                      <Row gutter={16}>
                        <Col xs={24}>
                          <Form.Item
                            label="Full name"
                            name="username"
                            required
                            validateStatus={errors.username && touched.username ? 'error' : ''}
                            help={errors.username && touched.username && errors.username}
                            value={userDetails.username}
                          >
                            <Input name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item
                            label="Phone Number"
                            name="phone"
                            required
                            validateStatus={errors.phone && touched.phone ? 'error' : ''}
                            help={errors.phone && touched.phone && errors.phone}
                          >
                            <Input name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Save information
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </Formik>

                <h4 style={{ marginTop: 100 }}>Change password</h4>
                <Form
                  layout="vertical"
                  form={form}
                  name="changePasswordForm"
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
                      Confirm new password
                    </Button>
                  </Form.Item>
                </Form>
              </Content>
            </Layout>
          </Content>
        </Layout>
      ) : (
        navigate('/login')
      )}
    </>
  );
};

export default Logout;
