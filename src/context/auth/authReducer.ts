import axios from "axios"
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

export interface Istate {
	token: string;
	isAuthenticated: boolean | null;
	loading: boolean;
	user: any;
	error: string | null;
}
export default (state: Istate, action: any) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem("token");

			return {
				isAuthenticated: false,
				loading: false,
				error: false,
				user: null
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
		
		localStorage.setItem("token",action.payload.token);
			//console.log(localStorage.setItem("token", action.payload));
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
				error: false,
				user:action.payload.user
			};
		case REGISTER_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				error: action.payload
			};

		default:
			return state;
	}
};
