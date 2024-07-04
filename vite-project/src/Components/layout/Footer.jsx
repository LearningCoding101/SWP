


import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text} = Typography;

const AppFooter = () => {
  const today = new Date();

  return (
    <Footer style={{ backgroundColor: '#001529', color: '#fff', padding: '40px 50px' , marginTop:20}}>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff' }}>About Us</Title>
          <Text style={{ color: '#fff' }}>
            BadCourts is your go-to platform for booking sports courts online. We strive to provide the best user experience and support for all your booking needs.
          </Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff' }}>Quick Links</Title>
          <Space direction="vertical">
            <Link to={'/'} style={{ color: '#fff' ,textDecoration: 'none'}}>Home</Link>
            {/* <Link href="/about" style={{ color: '#fff' }}>About Us</Link> */}
            <Link to={'/clubs'} style={{ color: '#fff' ,textDecoration: 'none'}}>Services</Link>
            <Link to={'/contact'} style={{ color: '#fff',textDecoration: 'none' }}>Contact</Link>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff' }}>Contact Us</Title>
          <Text style={{ color: '#fff' }}>123 Sport Ave, Fitness City</Text><br />
          <Text style={{ color: '#fff' }}>Email: support@badcourts.com</Text><br />
          <Text style={{ color: '#fff' }}>Phone: (123) 456-7890</Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff' }}>Follow Us</Title>
          <Space>
            <Link href="https://facebook.com" target="_blank" style={{ color: '#fff' ,textDecoration: 'none'}}>
              <FacebookOutlined style={{ fontSize: '24px' }} />
            </Link>
            <Link href="https://twitter.com" target="_blank" style={{ color: '#fff' ,textDecoration: 'none' }}>
              <TwitterOutlined style={{ fontSize: '24px' }} />
            </Link>
            <Link href="https://instagram.com" target="_blank" style={{ color: '#fff' ,textDecoration: 'none'}}>
              <InstagramOutlined style={{ fontSize: '24px' }} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" style={{ color: '#fff' ,textDecoration: 'none'}}>
              <LinkedinOutlined style={{ fontSize: '24px' }} />
            </Link>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff' }}>Policy</Title>
          <Space direction="vertical">
            <Link href="/privacy-policy" style={{ color: '#fff' ,textDecoration: 'none'}}>Privacy Policy</Link>
            <Link href="/terms-of-service" style={{ color: '#fff' ,textDecoration: 'none'}}>Terms of Service</Link>
            <Link href="/cookie-policy" style={{ color: '#fff' ,textDecoration: 'none'}}>Cookie Policy</Link>
          </Space>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col>
          <Text style={{ color: '#fff' }}>&copy; {today.getFullYear()} BadCourts</Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
