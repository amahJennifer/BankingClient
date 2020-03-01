import React, { useContext, useEffect } from "react";
import { useAuthContext } from "../context/auth/authContext";
import { withRouter } from "react-router";

const DashBoard = () => {
	// const authContext = useAuthContext()
	const {
		loadUser,
		state: { user }
	} = useAuthContext();

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="Container">
			<div className="Profile">
				<p>Name:{user.firstName}</p>
				<div className="Details">
					Account Type :Savings
					<div className="Account">
						<p>{user.firstName}</p>
					</div>
				</div>
			</div>
			<div>
				<table>
					<p>TRANSACTIONS TABLE</p>
				</table>
			</div>
		</div>
	);
};

export default withRouter(DashBoard);
