import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"
import { classNames } from 'classnames';

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const loginUserName = localStorage.getItem('userName')
	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: " You have been logged out!" } })
	}

	return (
		<>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<p className="dropdown-item">
				{loginUserName}
				</p>
			<button className="dropdown-item" onClick={handleLogout}>
				Logout
			</button>
		</>
	)
}

export default Logout