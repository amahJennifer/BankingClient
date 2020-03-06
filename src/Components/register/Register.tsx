import React, {
	useContext,
	useState,
	ChangeEvent,
	FormEvent,
	useEffect
} from "react";
import welcomeImage from "../landingPage/home.svg"
import { useAuthContext } from "../../context/auth/authContext";
import AlertContext from "../../alert/alertContext";
import { useHistory } from "react-router";
import "./register.css"

const Register = (props: any) => {
	// const authContext = useContext(AuthContext);
	 const history = useHistory();

	const { setAlert } = useContext(AlertContext);
	const {
		register,
		state: { error, isAuthenticated }
	} = useAuthContext();

	useEffect(() => {
		if (isAuthenticated) {
		history.push('/dashboard')
		}

		if (error === "user Already Exists") {
			setAlert(error, 'danger')
		}
		// eslint-disable-next-line
	}, [isAuthenticated,error]);

	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setUser({ ...user, [e.target.name]: e.target.value });

	const { firstName, lastName, email, password, confirmPassword } = user;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			firstName === "" ||
			lastName === "" ||
			email === "" ||
			password === ""
		) {
			setAlert("Please Enter all Fields ", "danger");

			return;
		}

		if (password !== confirmPassword) {
			setAlert("Passwords do not match", "danger");

			return;
		}

		register({
			firstName,
			lastName,
			email,
			password
		});
	};

	return (
		<div className="landingPage">
			<div className="landingImage">
				<img src={welcomeImage} />
			</div>
			<div className="landingPageText">
				<div className="registerForm">
					<form onSubmit={handleSubmit}>
						<h1>Create an Account </h1>
						<label htmlFor="firstName">
							FirstName:
							<input name="firstName" type="text" onChange={handleChange} />
						</label>
						<label htmlFor="lastName">
							LastName:
							<input name="lastName" type="text" onChange={handleChange} />
						</label>
						<label htmlFor="email">
							Email:
							<input name="email" type="text" onChange={handleChange} />
						</label>
						<label htmlFor="password">
							Password:
							<input name="password" type="password" onChange={handleChange} />
						</label>
						<label htmlFor="password2">
							Confirm Password:
							<input
								name="confirmPassword"
								type="password"
								onChange={handleChange}
							/>
						</label>
						<input type="submit" value="Register" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
