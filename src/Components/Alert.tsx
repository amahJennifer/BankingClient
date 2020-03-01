import React, { useContext } from "react";
import AlertContext from "../alert/alertContext";

function Alert() {
	const { setAlert, state: alerts } = useContext(AlertContext);

	return (
		<div>
			{alerts.length > 0 &&
				alerts.map(alert => (
					<div key={alert.id} className={`alert alert-${alert.type}`}>
						<i className="fas fa-info-circle">{alert.msg}</i>
					</div>
				))}
		</div>
	);
}

export default Alert;
