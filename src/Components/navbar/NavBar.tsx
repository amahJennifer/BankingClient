import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/auth/authContext";
import "../../Components/navbar/navbar2.css";
import hamburger from "./hamburger.svg";
export const NavBar = () => {
	const history = useHistory();
	console.log(useAuthContext());
	const {
		state: { isAuthenticated, user },
		logOut
	} = useAuthContext();
	const logOuts = () => {
		logOut();
		history.push("/");
	};

	const [show, setShow] = useState(false)
	const authLinks = (


		<Fragment>
			<li className="nav_list">
				<Link to="/transfer">Transfer</Link>
			</li>
			<li style={{ padding: "10px" }}>Hello</li>
			<li>{user?.firstName}</li>
			<li className="nav_list" onClick={logOuts} style={{ padding: "10px" }}>
				<a href="#">Logout</a>
			</li>
		</Fragment>
	);
	const guestLinks = (
		<Fragment>
			<li className="nav_list">
				<Link to="/register">Register</Link>
			</li>
			<li className="nav_list">
				<Link to="/login">Login</Link>
			</li>	
		</Fragment>
	);

	return (
		<nav className="nav">
			<a className="logo" href="#">
				<h3>JustSave</h3>
			</a>
			<li className="hamburger" role="button" onClick={() => setShow(!show)}>
				<img src={hamburger} />
			</li>
			<ul className="nav_list_container_services">
				<li className="nav_list">
					<a href="#">About</a>
				</li>
			</ul>

			<ul className="nav_list_container">
				{isAuthenticated ? authLinks : guestLinks}
			</ul>

			<div className={`ham-nav ${show ? 'show' : 'hide'}`}>
				<ul className="ham_nav_list_container">
					{isAuthenticated ? authLinks : guestLinks}
				</ul>
			</div>
		</nav>
	);
};
