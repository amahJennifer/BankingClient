import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import AlertContext from "../../alert/alertContext";
import { useAuthContext } from "../../context/auth/authContext";
import { userInfo } from "os";

function WithdrawModal(props: any) {
	const {
		depositFunc,
		state: { user }
	} = useAuthContext();
	const { setAlert } = useContext(AlertContext);
	const [withdraw, setWithdraw] = useState({
		type: "Debit",
		amount: 0
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setWithdraw({ ...withdraw, [e.target.name]: Number(e.target.value) });
		// console.log(withdraw);
	};

	const { amount, type } = withdraw;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		//check if input COntains numbers

		console.log("Withdraw");
		console.log(user.balance)
		if (amount === 0) {
			setAlert("Please Enter Amount ", "danger");
			return;
		}

		if (user.balance < amount) {
			setAlert("Insufficeient Fund ");
			return;
		}
		depositFunc({ type, amount });
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<b>WithDraw</b>
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
							aria-describedby="inputGroup-sizing-sm"
							placeholder="1000000000"
							onChange={handleChange}
							name="amount"
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button type="submit" variant="primary">
						Withdraw
					</Button>
					<Button onClick={props.onHide} variant="danger">
						Cancel
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default WithdrawModal;
