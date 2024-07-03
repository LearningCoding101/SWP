// import React, { useContext, useState } from "react";
// import { AuthContext } from "./AuthProvider";
// import { useNavigate } from "react-router-dom";
// import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
// import { Breadcrumb, Button, Input, Layout, Menu, Form, message, theme, Row, Col } from 'antd';
// import { Formik, Field, ErrorMessage, useFormikContext } from 'formik';
// import * as Yup from 'yup';
// import api from "../../config/axios";
// const { Header, Content, Footer, Sider } = Layout;

// const Logout = () => {
//   const [form] = Form.useForm();
//   const [form2] = Form.useForm();
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();
//   const loginUserName = localStorage.getItem('userName');
//   const loginPhone = localStorage.getItem('userPhone');
//   const [userDetails, setUserDetails] = useState({ username: loginUserName, phone: loginPhone}); // Store user details

//   const validationSchema = Yup.object().shape({
//     username: Yup.string().required('Username is required'),
//     phone: Yup.string().required('Email is required'),
//   });

//   const handleSave = async () => { // Access values through context
//     const form = useFormikContext(); // Get Formik context
//     const { values } = form;
  
//     try {
//       const response = await api.put(`/${values.username}/${values.phone}`);
//       setUserDetails(response.data); // Update state with new data
//       message.success('User details saved successfully!');
//     } catch (error) {
//       console.error('Error saving user details:', error);
//       message.error('An error occurred while saving user details.');
//     }
//   };
//   const onChangePassword = async (values) => {
//     const payload = {
//       password: values.newPassword
//     }
//     try {
//       // Make the POST request
//       const response = await api.post("/reset-password", payload);
//       console.log(response)
//       // Handle response here
//       message.success("Reset successful!");
//     } catch (error) {
//       // Handle error here
//       console.error("Error occurred:", error);
//       message.error("An unknown error occurred. Please try again.");
//     }
//   };

//   const handleLogout = () => {
//     auth.handleLogout();
//     navigate("/");
//   };

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout style={{ height: '100vh' }}>
//       <Content
//         style={{
//           padding: '48px',
//         }}
//       >
//         <Layout
//           style={{
//             padding: '24px 0',
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Sider
//             style={{
//               background: colorBgContainer,
//               width: 200,
//               display: 'flex', // Added flexbox for Sider layout
//               flexDirection: 'column', // Stack elements vertically
//               justifyContent: 'space-between', // Align content at top and bottom
//             }}
//           >
//             <Menu
//               mode="inline"
//               defaultSelectedKeys={['1']}
//               style={{
//                 height: 'calc(100% - 50px)', // Adjust height for button placement
//               }}
//               items={[
//                 {
//                   key: '1',
//                   icon: <UserOutlined />,
//                   label: 'User Profile',
//                 },
//               ]}
//             />

//             {/* Logout Button with Styles */}
//             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
//               <Button type="danger" icon={<LogoutOutlined />} onClick={handleLogout}>
//                 Logout
//               </Button>
//             </div>
//           </Sider>
//           <Content
//             style={{
//               padding: '24px',
//               minHeight: 280,
//               height: '100%',
//             }}
//           >
//             {/* <h4>Account Detail</h4>
//             <p className="dropdown-item">
//               Username: {loginUserName}
//             </p>
//             <p className="dropdown-item">
//               Email: {loginEmail}
//             </p> */}
//             <h4>Account Detail</h4>
//             <Formik initialValues={userDetails} validationSchema={validationSchema} onSubmit={handleSave}>
//               {({ values, handleChange, handleBlur, errors, touched }) => (
//                 <Form layout="vertical" form={form2}>
//                   <Row gutter={16}>
//                     <Col xs={24}>
//                       <Form.Item label="Username" required>
//                         <Input name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
//                         {errors.username && touched.username && <ErrorMessage>{errors.username}</ErrorMessage>}
//                       </Form.Item>
//                     </Col>
//                     <Col xs={24}>
//                       <Form.Item label="Phone Number" required>
//                         <Input name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} />
//                         {errors.phone && touched.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   <Form.Item>
//                     <Button type="primary" htmlType="submit" onClick={handleSave}>
//                       Save information
//                     </Button>
//                   </Form.Item>
//                 </Form>
//               )}
//             </Formik>

//             {/* Added Input Fields */}
//             <h4 style={{ marginTop: 100 }}>Change password </h4>
//             <Form
//               layout="vertical"
//               form={form}
//               name="bookingForm"
//               onFinish={onChangePassword}
//             >
//               <Row gutter={16}>
//                 <Col xs={24} sm={12} md={8} lg={6} xl={6}>
//                   <Form.Item
//                     label="New password"
//                     name="newPassword"
//                     rules={[
//                       { required: true, message: "Please input your new password!" },
//                     ]}
//                   >
//                     <Input.Password
//                       placeholder="Enter new password"
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col xs={24} sm={12} md={8} lg={6} xl={6}>
//                   <Form.Item
//                     label="Confirm new password"
//                     name="passwordConfirm"
//                     rules={[
//                       { required: true, message: "Please confirm your new password!" },
//                       ({ getFieldValue }) => ({
//                         validator(_, value) {
//                           if (!value || getFieldValue('newPassword') === value) {
//                             return Promise.resolve();
//                           }
//                           return Promise.reject(new Error('Password does not match!'));
//                         },
//                       }),
//                     ]}
//                   >
//                     <Input.Password
//                       placeholder="Confirm new password"
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Confirm new password
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Content>
//         </Layout>
//       </Content>
//     </Layout>
//   );
// };

// export default Logout;


import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Layout, Menu, Form, message, theme, Row, Col } from 'antd';
import { Formik, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import api from "../../config/axios";

const { Header, Content, Footer, Sider } = Layout;

const Logout = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const loginUserName = localStorage.getItem('userName');
  const loginPhone = localStorage.getItem('userPhone');
  const [userDetails, setUserDetails] = useState({ username: loginUserName, phone: loginPhone });

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    phone: Yup.string().required('Phone is required'),
  });

  const handleSave = async (values, actions) => {
    const payloadData = {
      fullName: values.username,
      phone: values.phone
    }
    try {
      const response = await api.put('/updateNameAndPhone', payloadData);
      setUserDetails(response.data);
      message.success('User details saved successfully!');
      localStorage.setItem("userName", values.username),
      localStorage.setItem("userPhone", values.phone)
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
            <Formik
              initialValues={userDetails}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                <Form layout="vertical" form={form2} onFinish={handleSubmit}>
                  <Row gutter={16}>
                    <Col xs={24}>
                      <Form.Item
                        label="Username"
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
  );
};

export default Logout;
