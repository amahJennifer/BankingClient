import React, { useReducer, createContext, Context } from "react";
import axios from "axios";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from "../type";

type obj = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

type loginObj = {
	email: string;
	password: string;
};

interface IState {
	token: string;
	isAuthenticated: boolean;
	loading: boolean;
	user: { firstName: string,balance:number };
	error: string;
}

interface AuthContextType {
	state: IState;
	register: (object: obj) => Promise<void> | null;
	loadUser: () => Promise<void> | null;
	login: (object: loginObj) => Promise<void> | null;
	logOut: () => Promise<void> | null;
}

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	loading: true,
	user: {},
	error: "null"
};

// interface IAuthState
// 	extends Context<{ state: { isAuthenticated: any; user: any }; LogOut: any }> {
// 	children?: JSX.Element | JSX.Element[];
// }

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
	const authContext = React.useContext(AuthContext);

	if (!authContext) {
		throw new Error("AuthContext must be used within an AuthProvider");
	}

	return authContext;
}

interface Iform {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const AuthState = (props: React.PropsWithChildren<unknown>) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const register = async (formData: obj) => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		try {
			const res = await axios.post(
				"http://localhost:3006/api/register",
				formData,
				config
			);
			//	const res = { data: { firstName: 1 } };
			console.log("registration: ", res);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response
			});
		}
	};

	//Load User
	const loadUser = async () => {
		//@todo -load token into global headers
		if (localStorage.token) {
			//setAuthToken(localStorage.getItem('token'));
			const token = localStorage.getItem("token");
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			console.log(localStorage.getItem("token"));
			console.log(axios.defaults.headers.common["Authorization"]);
		}

		try {
			const res = await axios.get("http://localhost:3006/api/auth");

			console.log(res);

			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (error) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	//login User
	const login = async (formData: loginObj) => {
		//	console.log(formData)
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		try {
			const res = await axios.post(
				"http://localhost:3006/api/login",
				formData,
				config
			);
			console.log("BeforeDispatch", res);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});

			// loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response
			});
			console.log(err.response);
		}
	};

	// logout User
	const logOut = async () => {
		dispatch({ type: LOGOUT });
	};

	return (
		<AuthContext.Provider value={{ state, register, loadUser, login, logOut }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
