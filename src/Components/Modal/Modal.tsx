import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function MyVerticallyCenteredModal(props:any) {
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
						placeholder="100000000000"
					/>
				</InputGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary">Deposit</Button>
				<Button onClick={props.onHide} variant="danger">Cancel</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default MyVerticallyCenteredModal;