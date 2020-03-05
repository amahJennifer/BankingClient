import React, {
	useContext,
	useState,
	ChangeEvent,
	FormEvent,
	useEffect
} from "react";
import welcomeImage from "../landingPage/home.svg";
import { useAuthContext } from "../../../src/context/auth/authContext";
import AlertContext from "../../alert/alertContext";
import { useHistory } from "react-router";
import "./login.css"
const Login = () => {
	const {
		state: { error, isAuthenticated },
		login
	} = useAuthContext();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const { setAlert } = useContext(AlertContext);
	const history = useHistory();


	useEffect(() => {
		if (isLoggedIn) {
			console.log(isLoggedIn);
			history.push("./dashboard");
		}
	}, [isLoggedIn]);

	const [user, setUser] = useState({
		email: "",
		password: ""
	});
	const { email, password } = user;

	// const { firstName, lastName, email, password, confirmPassword } = user;
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Register Submit");
		console.log(error);
		if (!email || !password) {
			setAlert("Please enter all fields", "danger");
		} else {
			login({ email, password });
			setIsLoggedIn(true);
		}
	};

	return (
		<div className="landingPage">
			<div className="landingImage">
				<img src={welcomeImage} />
			</div>
			<div className="landingPageText">
				<div className="loginForm">
					<h1>Login</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="email">
							Email:
							<input name="email" type="text" onChange={handleChange} />
						</label>
						<label htmlFor="password">
							Password:
							<input name="password" type="password" onChange={handleChange} />
						</label>
						<input type="submit" value="Register" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
