import React from 'react'
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
export const Header = () => {
    return (
			<Navbar expand="lg" variant="light" bg="light">
				<Container>
					<Navbar.Brand href="#">Invest</Navbar.Brand>
					<Nav className="justify-content-end" activeKey="/home">
						<Nav.Item>
                        <Nav.Link><Link to="/register">Register</Link></Nav.Link>
						</Nav.Item>
						<Nav.Item>
					<Nav.Link eventKey="link-1"><Link to="/login">Login</Link></Nav.Link>
						</Nav.Item>
					</Nav>
				</Container>
			</Navbar>
		);
}
