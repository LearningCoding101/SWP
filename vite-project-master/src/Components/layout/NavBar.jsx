import React, { useContext, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import Logout from "../Login/Logout"
const NavBar = () => {
	const [showAccount, setShowAccount] = useState(false)

	const handleAccountClick = () => {
		setShowAccount(!showAccount)
	}

	const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")


	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
			<div className="container-fluid">
				<Link to={"/"} className="navbar-brand">
					<span className="hotel-color">BadCourts</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to={"/clubs"}>
								All clubs
							</NavLink>
						</li>

						{isLoggedIn && userRole === "ADMIN" && (
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to={"/adminDashboard"}>
									Admin
								</NavLink>
							</li>
						)}
					</ul>

					<ul className="d-flex navbar-nav">
						{isLoggedIn && userRole === "ClUB_OWNER" && (
							<li className="nav-item">
								<NavLink className="nav-link" to={"/CRUD"}>
									CRUD Demo
								</NavLink>
							</li>
						)}
						<li className="nav-item dropdown">
							<a
								className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>
								{" "}
								Account
							</a>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
								{isLoggedIn ? (
									<div>
										<Link className="dropdown-item" to={"/logout"}>
											Profile
										</Link>
										{userRole === "CUSTOMER" && (
											<div>
												<Link className="dropdown-item" to={"/bookingHistory"}>
													History
												</Link>

												{/* <Link className="dropdown-item" to={"/booking"}>
													Book now DEMO
												</Link> */}
											</div>
										)}
									</div>

								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavBar