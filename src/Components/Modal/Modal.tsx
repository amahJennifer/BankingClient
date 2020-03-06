import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import AlertContext from "../../alert/alertContext"
import {useAuthContext} from "../../context/auth/authContext"

function MyVerticallyCenteredModal(props: any) {
	const { depositFunc } = useAuthContext();
	const { setAlert } = useContext(AlertContext);
	const [deposit, setDeposit] = useState({
		type: "Credit",
		amount: 0
	});
	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setDeposit({ ...deposit, [e.target.name]:Number( e.target.value )});

	const { amount,type } = deposit;
	
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//check if input COntains numbers 
		
		if (amount === 0) {
			setAlert("Please Enter Amount ", "danger");
			return;
		}
	

		depositFunc({ type, amount })
	}
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<b>Deposit</b>
				</Modal.Title>
			</Modal.Header>
			<form onSubmit={handleSubmit}>
			<Modal.Body>
				
						<InputGroup size="lg">
					<InputGroup.Prepend>
						<InputGroup.Text id="inputGroup-sizing-lg">
							Enter Amount{" "}
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
							aria-label="Large"
							name="amount"
						aria-describedby="inputGroup-sizing-sm"
							placeholder="100000000000"
							type="number"
						onChange={handleChange}
					/>
				</InputGroup>
			
			
			</Modal.Body>
				
			<Modal.Footer>
				<Button type="submit" variant="primary" >Deposit</Button>
				<Button onClick={props.onHide} variant="danger">
					Cancel
				</Button>
				</Modal.Footer>
						</form>
			
		</Modal>
	);
}
export default MyVerticallyCenteredModal;
