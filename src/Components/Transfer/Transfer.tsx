import React,{useState,useContext,ChangeEvent,FormEvent} from "react";
import { useAuthContext } from "../../context/auth/authContext"
import AlertContext from "../../alert/alertContext"
import axios from "axios"



const Transfer = () => {
	const [accountNumber, setAccountNumber] = useState("");
	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setAccountNumber(e.target.value);
	//console.log(accountNumber);
//get Context
	const { transfer, state: {
		user
	}} = useAuthContext();
const { setAlert } = useContext(AlertContext);
	
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    console.log(accountNumber)
		if (accountNumber === "") {
			setAlert("Please Enter Account Number ", "danger");
			return;
		}
		type accountDetail = {
	accountNumber: string;
}
//GET TRANSFER DETAILS
const getDetails = async (accountNumber: accountDetail) => {

	const config = {
		headers: {
			"Content-Type": "application/json"
		}
  };
  
  try {
    const res = await axios.post("http://localhost:3006/api/customerDetails",
      accountNumber,
      config
    );
    return res;
  } catch (err) {
    setAlert(err.message, "danger")
    return;
  }
};
		
	getDetails({ accountNumber })

	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="accountNumber">
				Enter Account Number
				<input name="accountNumber" type="text" onChange={handleChange} />
			</label>
			<button type="submit">Find</button>
		</form>
	);
};



export default Transfer;
