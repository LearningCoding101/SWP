// import React, { useContext } from "react"
// import { AuthContext } from "./AuthProvider"
// import { Link, useNavigate } from "react-router-dom"
// import { classNames } from 'classnames';

// const Logout = () => {
// 	const auth = useContext(AuthContext)
// 	const navigate = useNavigate()
// 	const loginUserName = localStorage.getItem('userName')
// 	const handleLogout = () => {
// 		auth.handleLogout()
// 		navigate("/", { state: { message: " You have been logged out!" } })
// 	}

// 	return (
// 		<>
// 			<li>
// 				<hr className="dropdown-divider" />
// 			</li>
// 			<p className="dropdown-item">
// 				{loginUserName}
// 				</p>
// 			<button className="dropdown-item" onClick={handleLogout}>
// 				Logout
// 			</button>
// 		</>
// 	)
// }

// export default Logout



import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { useNavigate } from "react-router-dom"
import { LaptopOutlined, NotificationOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
	key,
	label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
	const key = String(index + 1);
	return {
		key: `sub${key}`,
		icon: React.createElement(icon),
		label: `User profile ${key}`,
		children: new Array(4).fill(null).map((_, j) => {
			const subKey = index * 4 + j + 1;
			return {
				key: subKey,
				label: `option${subKey}`,
			};
		}),
	};
});



const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const loginUserName = localStorage.getItem('userName')
	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: " You have been logged out!" } })
	}
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<Layout style={{ height: '100vh' }}>
			<Content
				style={{
					padding: ' 48px',
					
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
						}}
						width={200}
					>
						<Menu
							mode="inline"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							style={{
								height: '100%',
							}}
							items={items2}
						/>
					</Sider>
					<Content
						style={{
							padding: ' 24px',
							minHeight: 280,
							height: '100%',
						}}
					>
						<p className="dropdown-item">
							Username: {loginUserName}
						</p>
						<Button type="danger" icon={<LogoutOutlined />} onClick={handleLogout}>
							Logout
						</Button>

					</Content>
				</Layout>
			</Content>

		</Layout>
	);
};
export default Logout;