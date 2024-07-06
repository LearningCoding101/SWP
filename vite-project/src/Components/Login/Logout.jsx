
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Layout, Menu, Form, message, theme, Row, Col } from 'antd';
import { Formik, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import api from "../../config/axios";
import { login } from "../API/LoginService";

const { Header, Content, Footer, Sider } = Layout;

const Logout = () => {
  const accessToken = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("token")
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginUserName, setLoginUserName] = useState('')
  const [loginPhone, setLoginPhone] = useState('') 
  const loginEmail = localStorage.getItem('userEmail')
  const [userDetails, setUserDetails] = useState({ username: '', phone: '' });
 

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Full name is required'),
    phone: Yup.string().required('Phone is required'),
  });

 
    useEffect(() => {
      const fetchAccountInfo = async () => {
        try {
          const response = await api.get(`/account/${loginEmail}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          // console.log(response.data);
          setUserDetails({
            username: response.data.fullName,
            phone: response.data.phone,
          });
        } catch (error) {
          console.error("Error fetching clubs:", error);
        }
      };
      if (accessToken && loginEmail) {
        fetchAccountInfo();
      }
      fetchAccountInfo();
    }, [accessToken]);

  

  const handleSave = async (values, actions) => {
    const payloadData = {
      fullName: values.username,
      phone: values.phone
    }
    try {
      const response = await api.put('/updateNameAndPhone', payloadData);
      setUserDetails(response.data);
      message.success('User details saved successfully!');
      navigate("/")
    } catch (error) {
      console.error('Error saving user details:', error);
      message.error('An error occurred while saving user details.');
    }
    actions.setSubmitting(false);
  };

  const onChangePassword = async (values) => {
    const payload = {
      password: values.newPassword
    }
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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Sider
                style={{
                  background: colorBgContainer,
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
                  enableReinitialize //THIS ONE IS REALLY IMPORTANT
                  validationSchema={validationSchema}
                  onSubmit={handleSave}
                >
                  {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                    <Form layout="vertical" form={form2} onFinish={handleSubmit}>
                      <Row gutter={16}>
                        <Col xs={24}>
                          <Form.Item
                            label="Full name"
                            required
                            validateStatus={errors.username && touched.username ? 'error' : ''}
                            help={errors.username && touched.username && errors.username}
                          >
                            <Input name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item
                            label="Phone Number"
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
