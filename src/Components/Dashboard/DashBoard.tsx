import React, { useContext, useEffect } from "react";
import { useAuthContext } from "../../context/auth/authContext";
import { withRouter } from "react-router";
import "./dashboard.css";
import transferImg from "../../transfer.svg";
import MyVerticallyCenteredModal from "../Modal/Modal";
import WithdrawModal from "../Modal/WModal";
const DashBoard = () => {
	// const authContext = useAuthContext()
	const {
		loadUser,
		state: { user, userTransactions }
	} = useAuthContext();

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);
	const [modalShow, setModalShow] = React.useState(false);
	const [wmodalShow, setWModalShow] = React.useState(false);
	// const tableList = userTransactions.map((transaction) => {
	// 	return (
	// 		<>
	// 				<tr>{transaction.amount}</tr>
	// 			<tr>{transaction.balance}</tr>
	// 			<tr>{transaction.transactionType}</tr>
	// 			</>
	// 	);

	// })
	return (
		<div className="new-container">
			<div className="main bordered">
				<div className="cash">
					<div className="cashText">
						<h2>Cash</h2>
						<p>{user ? user.balance: 'loading...'}</p>
					</div>
					<div className="buttons">
						<button
							className="depositButton ui-deposit"
							onClick={() => setModalShow(true)}
						>
							Deposit
						</button>
						<WithdrawModal show={wmodalShow} onHide={() => setWModalShow(false)} />
						<MyVerticallyCenteredModal
							show={modalShow}
							onHide={() => setModalShow(false)}
						/>
						{/* <WithdrawModal
							show={wmodalShow}
							onHide={() => setWModalShow(false)}
						/> */}
						<button
							className="withdrawButton"
							onClick={() => setWModalShow(true)}
						>
							Withdraw
						</button>
					</div>
				</div>
				<div className="transaction">
					<table className="transaction-table ">
						<tr className="tableHead">
							<th>Date</th>
							<th>Amount</th>
							<th>Balance</th>
						</tr>

						{userTransactions.map(transaction => (
							<tr>
								<td>{transaction.balance}</td>
								<td>{transaction.transactionType}</td>
								<td>{transaction.amount}</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		</div>
	);
};

export default withRouter(DashBoard);
