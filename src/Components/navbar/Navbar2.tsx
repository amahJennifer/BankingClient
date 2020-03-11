import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/auth/authContext";
import "../../Components/navbar/navbar2.css";

export const NavBar2 = () => {
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

	const authLinks = (
		<>
			<li className="nav_list">
				<Link to="/transfer">Transfer</Link>
			</li>
			<li style={{ padding: "10px" }}>Hello</li>
			<li>{user?.firstName}</li>
			<li className="nav_list" onClick={logOuts} style={{ padding: "10px" }}>
				<a href="#">Logout</a>
			</li>
		</>
	);
	const guestLinks = (
		<Fragment>
			<li className="nav_list">
				<Link to="/register">Register</Link>
			</li>
			<li className="nav_list">
				<Link to="/login">Login</Link>
			</li>
			<button className="navButton">Signup</button>
		</Fragment>
	);

	return (
		<nav className="nav1">
			<a className="logo1" href="#">
				<h3>JustSave</h3>
			</a>
			<ul className="nav_list_container_services1">
				<li className="nav_list1">
					<a href="#">About</a>
				</li>
			</ul>

			<ul className="nav_list_container1">
				{isAuthenticated ? authLinks : guestLinks}
			</ul>
		</nav>
	);
};
