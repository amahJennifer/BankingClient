import React from "react";
import welcomeImage from "../landingPage/home.svg";
import "./landingpage.css";
export const LandingPage = () => {
	return (
		<div className="landingPage">
			<div className="landingPageText">
				<div className="welcomeText">
					<h1>More than just shorter links More Money Save !</h1>
				</div>
				<div className="buttonContainer">
					<button className="welcomeButton">Get Started </button>
				</div>
			</div>
			<div className="landingImage">
				<img src={welcomeImage} />
			</div>
		</div>
	);
};
