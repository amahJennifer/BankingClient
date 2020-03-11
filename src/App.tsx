import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom"
import {NavBar} from "./Components/navbar/NavBar"
import { LandingPage } from './Components/landingPage/LandingPage'
import Login from "./Components/login/Login"
import Register from "./Components/register/Register"
import AuthState from './context/auth/authContext'
import setAuthToken from '../src/utils/setAuthToken'
import AlertState from "./alert/alertState"
import Alerts from "./Components/Alert"
import DashBoard from "./Components/Dashboard/DashBoard"
import PrivateRoute from "./Components/routing/PrivateRoute"
import Transfer from "../src/Components/Transfer/Transfer"
// if (localStorage.token) {
// 	setAuthToken(localStorage.token)
// }
const App = () => {
	return (
		<AuthState>
			<AlertState>
				<NavBar />
				
				<Alerts />
				<Switch>
					<Route exact path="/">
						<LandingPage />
					</Route>
					<PrivateRoute exact path="/dashboard" component={DashBoard} />
					{/* <DashBoard/> */}
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route exact path="/transfer">
						<Transfer />
					</Route>
				</Switch>
			</AlertState>
		</AuthState>
	);
};

export default App;
