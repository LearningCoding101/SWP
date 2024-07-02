import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import MyResponsiveLine from './LineGraph';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import AddClubCombo from './AddClubCombo';
import BookingReport from './BarChart';
import UserManage from './UserManage';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  // Existing menu items (key '1')
  // ...
  getItem('Income Analysis', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  // New menu items
   getItem('Manage Users', '12', <UserOutlined />),
  getItem('Add club', '10', <DesktopOutlined />),
  getItem('Bar Chart Demo', '11', <UserOutlined />),
 ];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const filteredItems = items.filter((item) => item.key === '1' || item.key === '10' || item.key === '11'  || item.key === '12');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        {/* Your Sider content */}
     
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]} // Highlight the selected item
          mode="inline"
          onClick={({ key }) => setSelectedKey(key)} // Update selectedKey on menu item click
          items={filteredItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          {/* Render relevant content based on selectedKey */}
          {/* Example: */}
          {selectedKey === '1' && <MyResponsiveLine />}
          {selectedKey === '10' && <AddClubCombo />}
          {selectedKey === '11' && <BookingReport />}
          {selectedKey === '12' && <UserManage />}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Badcourts ©{new Date().getFullYear()}. All rights reserved
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;


