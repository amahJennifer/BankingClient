import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	DEPOSIT_SUCCESS
} from "../type";
import transitions from "@material-ui/core/styles/transitions";
import {IState} from './authContext'

// export interface Istate {
// 	token: string;
// 	isAuthenticated: boolean | null;
// 	loading: boolean;
// 	user: any;
// 	error: string | null;
// 	userTransactions: object[]
// }
export default (state: IState, action: any) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload.user,
				userTransactions: action.payload.userTransactions
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
			localStorage.setItem("token", action.payload.token);
			//console.log(localStorage.setItem("token", action.payload));
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
				error: false,
				user: action.payload.user,
				userTransactions: action.payload.userTransactions
			};
		case DEPOSIT_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				...action.payload,
				user: action.payload.user,
				userTransactions: [
					...state.userTransactions,
					action.payload.TransactionDetail
				]
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
