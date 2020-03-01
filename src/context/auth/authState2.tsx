import React, { useReducer } from "react";
import AuthContext from './authContext'
import authReducer from "./authReducer";

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_ERRORS
} from "../type";

const AuthState2 = (props: { children: JSX.Element | JSX.Element[] }) => {
	const initialState = {
		token: localStorage.getItem("token"),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};
	const [state, dispatch] = useReducer(authReducer, initialState);

	//Load USer

	//Register User

	//Login User

	//Logout User

	return (
		<h1>hello</h1>
		// <AuthContext.Provider value={{

		// }}
		// >
		// 	{props.children}
		// </AuthContext.Provider>
	);
};

export default AuthState2;


// value={{
// 				token: state.token,
// 				isAuthenticated: state.isAuthenticated,
// 				loading: state.loading,
// 				user: state.user,
// 				error: state.error
// 			}}