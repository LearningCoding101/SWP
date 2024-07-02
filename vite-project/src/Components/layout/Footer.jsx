import React from "react"
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'

const Footer = () => {
	const today = new Date()
	return (
		<div className="bg-dark text-light py-3 mt-lg-5">
			<Container>
				<Row>
					<Col xs={12} md={12} className="text-center">
						<p className="mb-0"> &copy; {today.getFullYear()} BadCourts</p>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Footer