import {useContext} from "react"
import axios from "axios"
import AlertContext from "../alert/alertContext"

type accountDetail = {
	accountNumber: string;
}
const { setAlert } = useContext(AlertContext);
//GET TRANSFER DETAILS
export const getDetails = async (accountNumber: accountDetail) => {

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
