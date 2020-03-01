import React, { useContext } from "react";
import { useAuthContext } from "../../context/auth/authContext";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const authContext = useAuthContext();
  
	const { isAuthenticated, loading } = authContext.state;
	return (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated && !loading ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
