import React from 'react'
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "../../src/App.css"
import GoogleFontLoader from "react-google-font-loader";

export const Body = () => {
   
    return (
			<>
				<GoogleFontLoader
					fonts={[
						{
							font: "Roboto",
							weights: [400, "400i"]
						},
						{
							font: "Roboto Mono",
							weights: [500, 800]
						},
						{
							font: "",
							weights: [500, 800]
						}
					]}
					subsets={["cyrillic-ext", "greek"]}
				/>
				;
				<div>
					<div className="container-fluid landingPage">
						<div className="row homesection">
							<div className="col hometext">
								<div className="row">
									<div className="col-md-6 text-center text-md-left mt-xl-5 mb-5 ">
										<h1
											className="h1-responsive text pt-5"
											style={{
												fontFamily: "Montserrat, sans-serif",
												width: "30rem"
											}}
										>
											Online Banking is Easy
										</h1>
										<h2
											className="h2-responsive sub-text"
											style={{
												fontFamily: "Montserrat, sans-serif",
												width: "30rem"
											}}
										>
											Everyday Anywhere Anytime
										</h2>
										<p
											className="mb-4 lower-text"
											style={{
												fontFamily: "Montserrat, sans-serif",
												width: "30rem"
											}}
										>
											Get that Money !!!
										</p>
									</div>
								</div>
								<Button variant="primary">Get Started</Button>
							</div>
							<div className="col-6 homeimg">
								<Image src="home.svg" fluid />
							</div>
						</div>
					</div>
				</div>
			</>
		);
}
