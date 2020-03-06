import React, { useContext, useEffect } from "react";
import { useAuthContext } from "../../context/auth/authContext";
import { withRouter } from "react-router";
import "./dashboard.css"
import transferImg from "../../transfer.svg"
import MyVerticallyCenteredModal from "../Modal/Modal"
import WModal from "../Modal/WModal"
const DashBoard = () => {
	// const authContext = useAuthContext()
	const {
		loadUser,
		state: { user }
	} = useAuthContext();

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);
	const [modalShow, setModalShow] = React.useState(false);
	const [wmodalShow, setWModalShow] = React.useState(false);
	return (
		<div className="new-container">
			{/* <div className="sideButton">
				<img src={transferImg} />
				<img src={transferImg} />
			</div> */}
			<div className="main bordered">
				<div className="cash">
					<div className="cashText">
						<h2>Cash</h2>
						<p>{user?.balance}</p>
					</div>
					<div className="buttons">
						<button
							className="depositButton ui-deposit"
							onClick={() => setModalShow(true)}
						>
							Deposit
						</button>
						<MyVerticallyCenteredModal
							show={modalShow}
							onHide={() => setModalShow(false)}
						/>
						<WModal show={wmodalShow} onHide={() => setWModalShow(false)} />
						<button
							className="withdrawButton"
							onClick={() => setWModalShow(true)}
						>
							Withdraw
						</button>
					</div>
					{/* </div> */}
				</div>
				<div className="transaction">
					<table className="transaction-table">
						<tr>
							<th>Date</th>
							<th>Amount</th>
							<th>Balance</th>
						</tr>
						<tr>
							<td>Alfreds Futterkiste</td>
							<td>Maria Anders</td>
							<td>Germany</td>
						</tr>
					</table>
				</div>

				{/* <div className="transactionList">
					<p>2002-03-12</p>
					<p>100000</p>
					<p>200001556</p>
				</div> */}
			</div>
		</div>
	);
};

//modal function 
// const ModalBasicExample = () => (
// 	<Modal trigger={<Button>Deposit</Button>} basic size="small">
// 		<Header icon="archive" content="Archive Old Messages" />
// 		<Modal.Content>
// 			<Form>
// 				<Form.Field>
// 					<label>First Name</label>
// 					<input placeholder="First Name" />
// 				</Form.Field>
// 				<Form.Field>
// 					<label>Last Name</label>
// 					<input placeholder="Last Name" />
// 				</Form.Field>
// 				<Form.Field>
// 					<Checkbox label="I agree to the Terms and Conditions" />
// 				</Form.Field>
// 				<Button type="submit">Submit</Button>
// 			</Form>
// 		</Modal.Content>
// 		<Modal.Actions>
// 			<Button basic color="red" inverted>
// 				<Icon name="remove" /> No
// 			</Button>
// 			<Button color="green" inverted>
// 				<Icon name="checkmark" /> Yes
// 			</Button>
// 		</Modal.Actions>
// 	</Modal>
// );
export default withRouter(DashBoard);
