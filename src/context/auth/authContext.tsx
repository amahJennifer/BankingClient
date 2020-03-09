import React, { useReducer, createContext, Context } from "react";
import axios from "axios";
import authReducer from "./authReducer";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	DEPOSIT_SUCCESS,
	DEPOSIT_FAIL,
	TRANSFER_SUCCESS,
	TRANSFER_FAIL,
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
type depositObj = {
	type: string;
	amount:Number;
};
type transferObj = {
	type: string;
	amount: Number;
	accountNo: string;
};

export interface IState {
	token: string;
	isAuthenticated: boolean;
	loading: boolean;
	user: { firstName: string, balance: number };
	userTransactions:[{amount:number,balance:number,transactionType:string}]
	error: string;
}

interface AuthContextType {
	state: IState;
	register: (object: obj) => Promise<void> | null;
	loadUser: () => Promise<void> | null;
	login: (object: loginObj) => Promise<void> | null;
	logOut: () => Promise<void> | null;
	depositFunc: (object: depositObj) => Promise<void> | null;
	transfer: (object: transferObj) => Promise<void> | null;
}

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	loading: true,
	user: {},
	userTransactions: [],
	error: "null"
};


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


	//register User 
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
//deposit and withdraw
	const depositFunc = async (depositData: depositObj) => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};


		try {
			const res = await axios.patch("http://localhost:3006/api/transaction",
				depositData,
			config);
			dispatch({
				type: DEPOSIT_SUCCESS,
				payload:res.data
			})
			loadUser()

		} catch (err) {
			dispatch({
				type: DEPOSIT_FAIL,
				payload: err.response
			});
		}

	}

	//Transfer
	const transfer = async (transferData: transferObj) => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}

		};
try {
	const res = await axios.post(
		"http://localhost:3006/api/transfer",
		transferData,
		config
	);
	dispatch({
		type: TRANSFER_SUCCESS,
		payload: res.data
	});
	loadUser();
} catch (err) {
	dispatch({
		type: TRANSFER_FAIL,
		payload: err.response
	});
}

	}


	
	return (
		<AuthContext.Provider value={{ state, register, loadUser, login, logOut,depositFunc,transfer }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
