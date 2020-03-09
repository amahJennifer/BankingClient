import React from "react";
import Modal from "react-bootstrap/Modal";


function NestedModal(props: any) { 

  return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<b>Transaction</b>
				</Modal.Title>
			</Modal.Header>
		
				<Modal.Body>
			  Transaction Successful  !!!
				</Modal.Body>

		</Modal>
	);


}

export default NestedModal;

